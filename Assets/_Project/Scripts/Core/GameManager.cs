using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.XR;
using DG.Tweening;

public enum RoomTypes
{
    hallway,
    livingRoom,
    kitchen,
    attic
}

public enum GhostType
{
    Boe,
    Giechel,
    Laken,
    Fluisteraar,
    Rommernaar,
    Bewoner
}

public static class GameManager
{

    //objects
    public static Player player; //to instaly get plr
    public static RoomManager currentRoom;
    public static CanvasGroup roomLoadingGUIGroup;
    static Canvas roomLoadingCanvas;

    public static GameManagerConfig config = Resources.Load<GameManagerConfig>("GameManagerConfig");
    public static int totaleGhostCaught = 0;
    public static bool switching = false; //soon enuum of it when pause or more rule
    public static Dictionary<GhostType, GameObject> ghostModels = new();
    public static Dictionary<RoomTypes, List<GhostType>> ghostInRooms = new();
    public static Action initRoomGenaration;
    public static Action onGhostCaught;
    public static List<RoomTypes> spawnableGhostRoom = new(){
        RoomTypes.livingRoom,
        RoomTypes.kitchen,
        RoomTypes.attic
    };

    // Elke spookkamer meldt zich hier aan (RoomManager.Awake), zodat we weten hoeveel spoken hij wil.
    public static Dictionary<RoomTypes, RoomManager> rooms = new();

    // Einde van een ronde: gewonnen (alle spoken gevangen) of game-over (angstmeter vol).
    public static bool gameOver = false;
    public static Action<bool> onGameEnded; // true = gewonnen, false = game-over
    static bool restarting = false;

    [RuntimeInitializeOnLoadMethod]
    static void Init()
    {
        //load in objects
        #if UNITY_EDITOR
        if (XRSettings.loadedDeviceName == "") AddStaticObject(config.xrSimulator);
        #endif
        roomLoadingGUIGroup = AddStaticObject(config.roomLoadingScreen).GetComponent<CanvasGroup>();
        roomLoadingCanvas = roomLoadingGUIGroup.GetComponent<Canvas>();
        AttachFadeToCamera();

        //load in dictionary
        foreach (GameManagerConfig.GhostInfo info in config.ghostInfo)
        {
            ghostModels.Add(info.ghostType, info.ghost);
        }

        // Na "Opnieuw" laadt de scene opnieuw; dan moet het spel opnieuw opgebouwd worden.
        SceneManager.sceneLoaded += OnSceneLoaded;

        Debug.LogWarning("Testing mode btw");
        GenarateNewGame();
    }

    #region Game genaration
    static public void GenarateNewGame()
    {
        GenarateGhost();
        initRoomGenaration?.Invoke();
    }

    static void GenarateGhost()
    {
        //rule: every room gets its own number of ghosts (RoomManager.ghostCount, default 2)
        //bewoner always go in zolder :3, boe always in the living room

        //setup
        ghostInRooms.Clear();
        foreach (RoomTypes roomType in spawnableGhostRoom)
        {
            ghostInRooms.Add(roomType, new());
        }

        List<GhostType> remainingGhost = Enum.GetValues(typeof(GhostType)).Cast<GhostType>().ToList();

        //here the ghost that have always this spawn (only if that room wants ghosts)
        if (GhostCountFor(RoomTypes.attic) > 0) AddGhostToRoom(RoomTypes.attic, GhostType.Bewoner);
        if (GhostCountFor(RoomTypes.livingRoom) > 0) AddGhostToRoom(RoomTypes.livingRoom, GhostType.Boe);

        //loop all and add random ghost
        //DDD check soon or it is really rng ok
        foreach (RoomTypes roomType in spawnableGhostRoom)
        {
            // "<" en niet "!=": een kamer met 0 spoken mag nooit in een eindeloze lus komen.
            while (ghostInRooms[roomType].Count < GhostCountFor(roomType) && remainingGhost.Count > 0)
            {
                GhostType randomGhost = GetRandomValueOutOfList<GhostType>(remainingGhost);
                AddGhostToRoom(roomType, randomGhost);
            }
        }

        //debuggeer
        string debugGhostLocation = "";
        foreach (RoomTypes roomType in spawnableGhostRoom)
        {
            debugGhostLocation += $"{roomType.ToString()}: ";
            foreach (GhostType ghostType in ghostInRooms[roomType])
            {
                debugGhostLocation += $"{ghostType.ToString()}, ";
            }
            debugGhostLocation += "\n";
        }
        Debug.Log(debugGhostLocation);

        void AddGhostToRoom(RoomTypes roomType, GhostType ghostType)
        {
            ghostInRooms[roomType].Add(ghostType);
            remainingGhost.Remove(ghostType);
        }
    }

    // Hoeveel spoken deze kamer wil. Staat de kamer niet in de scene, dan de oude regel: 2.
    static int GhostCountFor(RoomTypes roomType)
    {
        return rooms.TryGetValue(roomType, out RoomManager room) ? room.ghostCount : 2;
    }

    static public int TotalGhosts()
    {
        int total = 0;
        foreach (List<GhostType> ghosts in ghostInRooms.Values) total += ghosts.Count;
        return total;
    }
    #endregion

    static public void SwitchRoom(RoomManager target)
    {
        if (switching || gameOver) return;
        switching = true;
        AttachFadeToCamera();

        //fade in
        DOTween.To(() => roomLoadingGUIGroup.alpha, x => roomLoadingGUIGroup.alpha = x,
        1, config.roomSwitchingDur)
         .OnComplete(() =>
         {
             //soon less laggy with deleting and adding by doing one on one
            currentRoom.Load(false);
            currentRoom = target;
            target.Load(true);

            // Via het teleport-systeem: dan sta je echt op het spawnpunt en kijk je de goede kant op,
            // ook als je in je speelruimte niet in het midden staat.
            player.TeleportTo(currentRoom.spawn);
            DOTween.To(() => roomLoadingGUIGroup.alpha, x => roomLoadingGUIGroup.alpha = x,
            0, config.roomSwitchingDur)
            .OnComplete(() => switching = false);
         });
    }

    #region Einde en opnieuw
    static public void WinGame()
    {
        EndGame(true);
    }

    static public void LoseGame()
    {
        EndGame(false);
    }

    static void EndGame(bool won)
    {
        if (gameOver) return;
        gameOver = true;

        onGameEnded?.Invoke(won);

        // Bij winnen wacht het paneel even, zodat je het spook nog ziet wegvliegen.
        float delay = won ? config.settings.winPanelDelay : 0f;
        DOVirtual.DelayedCall(delay, () =>
        {
            if (!config.endScreen) { Debug.LogError("GameManagerConfig: endScreen is leeg"); return; }
            EndScreen screen = GameObject.Instantiate(config.endScreen).GetComponent<EndScreen>();
            screen.Show(won);
        });
    }

    // Knop "Opnieuw": fade naar zwart, alles terug op nul, scene opnieuw laden.
    static public void Restart()
    {
        if (restarting) return;
        int sceneIndex = SceneManager.GetActiveScene().buildIndex;
        if (sceneIndex < 0) { Debug.LogError("Opnieuw werkt alleen als deze scene in Build Settings staat."); return; }
        restarting = true;
        AttachFadeToCamera();

        DOTween.To(() => roomLoadingGUIGroup.alpha, x => roomLoadingGUIGroup.alpha = x,
        1, config.roomSwitchingDur)
         .OnComplete(() =>
         {
             ClearSceneLinks();
             SceneManager.LoadScene(sceneIndex);
         });
    }

    // Alles wat naar objecten in de oude scene wijst. De nieuwe scene vult dit zelf weer in (Awake en Start).
    // gameOver blijft hier nog true: LoadScene laadt pas aan het eind van de frame, dus de oude scene
    // draait nog één keer door. Zou de volle angstmeter dan gameOver = false zien, dan start hij meteen weer game-over.
    static void ClearSceneLinks()
    {
        DOTween.KillAll(); // ook het wachtende eindpaneel en de vliegende spoken
        currentRoom = null;
        player = null;
        ghostInRooms.Clear();
        rooms.Clear();
        initRoomGenaration = null;
        onGhostCaught = null;
        onGameEnded = null;
    }

    static void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        if (!restarting) return;
        restarting = false;

        // Pas nu, in de nieuwe scene, het spel terug op nul.
        totaleGhostCaught = 0;
        switching = false;
        gameOver = false;

        // De nieuwe kamers hebben zich in Awake al aangemeld; nu de spoken weer verdelen.
        GenarateNewGame();
        AttachFadeToCamera();
        DOTween.To(() => roomLoadingGUIGroup.alpha, x => roomLoadingGUIGroup.alpha = x,
        0, config.roomSwitchingDur);
    }
    #endregion

    #region Helper function
    static public bool AllGhostInRoomAreCatch()
    {
        if (!currentRoom) {Debug.LogError("no starting room ig, or current room"); return false;}
        if (!spawnableGhostRoom.Contains(currentRoom.roomType)) return true;

        bool succes = ghostInRooms[currentRoom.roomType].Count == currentRoom.ghostCaught;
        return succes;
    }

    static public void CaughtGhost() //mabye need ghosttype
    {
        currentRoom.ghostCaught += 1;
        totaleGhostCaught += 1;
        onGhostCaught?.Invoke();

        if (totaleGhostCaught >= TotalGhosts()) WinGame();
    }

    static public List<GhostType> GetAvibleGhostOutRoom()
    {
        if (!currentRoom) {Debug.LogError("no starting room ig, or current room"); return null;}
        if (!spawnableGhostRoom.Contains(currentRoom.roomType)) return new(); //like looping through it nothing happing

        List<GhostType> ghostTypes = ghostInRooms[currentRoom.roomType];
        return ghostTypes;
    }

    // Een overlay-canvas wordt niet in de bril getekend. Daarom hangt het fade-scherm als vlak vlak voor de camera.
    // De camera verandert na het opnieuw laden van de scene, dus dit gebeurt voor elke fade (niet elke frame).
    static void AttachFadeToCamera()
    {
        if (!roomLoadingCanvas) return;
        Camera cam = Camera.main;
        if (!cam) return;
        roomLoadingCanvas.renderMode = RenderMode.ScreenSpaceCamera;
        roomLoadingCanvas.worldCamera = cam;
        roomLoadingCanvas.planeDistance = config.fadePlaneDistance;
    }

    static GameObject AddStaticObject(GameObject target)
    {
        GameObject newObject = GameObject.Instantiate(target);
        GameObject.DontDestroyOnLoad(newObject);
        return newObject;
    }

    public static T GetRandomValueOutOfList<T>(List<T> list)
    {
        if (list.Count == 0) {Debug.LogError($"list of type: {typeof(T).Name} is out of range"); return default;}
        T randomValue = list[(int)UnityEngine.Random.Range(0, list.Count)];

        return randomValue;
    }
    #endregion
}

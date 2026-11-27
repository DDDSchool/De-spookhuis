using UnityEngine;
using UnityEngine.UI;

public class FearMeter : MonoBehaviour
{
    [Header("UI")]
    [SerializeField] private Slider slider;

    [SerializeField] private bool seeGhost = false;//test
    private float currentFear = 0f;

    // De getallen staan in Data/GameSettings (kopje Angstmeter), zodat ontwerpers ze kunnen aanpassen.
    GameSettings settings;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        settings = GameManager.config.settings;
        GameManager.onGhostCaught += OnGhostCaught;
    }

    void OnDestroy()
    {
        GameManager.onGhostCaught -= OnGhostCaught;
    }

    // Update is called once per frame
    void Update()
    {
        if (!CanIncreaseFear()) return;

        float nextFear = currentFear + settings.fearPerSecond * Time.deltaTime;
        UpdateFear(nextFear);

        // Meter vol = game-over.
        if (currentFear >= settings.fearMax) GameManager.LoseGame();
    }

    public void OnGhostCaught()
    {
        float nextFear = currentFear - settings.fearPerCatch; //if it perfect it not workign so ima check that out later
        UpdateFear(nextFear);
    }

    //why update is bc when it decrease we also need it
    void UpdateFear(float nextFear)
    {
        currentFear = Mathf.Clamp(nextFear, 0, settings.fearMax);
        slider.value = currentFear / settings.fearMax;
    }

    bool CanIncreaseFear()
    {
        bool succes = !GameManager.gameOver && !GameManager.AllGhostInRoomAreCatch() && !seeGhost;
        return succes;
    }
}

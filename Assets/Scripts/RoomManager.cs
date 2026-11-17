using UnityEngine;

//shortcut
using RoomType = GameManager.RoomTypes;

public class RoomManager : MonoBehaviour
{
    public Transform spawn; //where the player going to spawn when switchen to this room
    public RoomType roomType;
    [SerializeField] [Tooltip("if this is where u start")] private bool startingRoom = false;
    
    [HideInInspector] public int ghostCaught = 0;

    void Awake()
    {
        //waring when enable this again it do it again but on other side the current room become this so don't matter for now
        if (!startingRoom) return;
        GameManager.currentRoom = this;
    }

    #region Visual
    void OnDrawGizmos()
    {
        if (!startingRoom) return;
        Gizmos.color = Color.green;
        Gizmos.DrawWireCube(transform.position, new Vector3(5, 5, 5)); //soon room size
        Gizmos.color = Color.clear;
    }
    #endregion
}

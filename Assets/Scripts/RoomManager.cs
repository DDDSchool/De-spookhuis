using UnityEngine;

public class RoomManager : MonoBehaviour
{
    public Transform spawn; //where the player going to spawn when switchen to this room
    [SerializeField] [Tooltip("if this is where u start")] private bool startingRoom = false;
    
    [HideInInspector] public int totaleGhost;

    void Awake()
    {
        //waring when enable this again it do it again but on other side the current room become this so don't matter for now
        if (!startingRoom) return;
        GameManager.currentRoom = this;
    }

    #region Visual
    void OnDrawGizmos()
    {
        Gizmos.color = Color.green;
        Gizmos.DrawWireCube(transform.position, new Vector3(5, 5, 5)); //soon room size
        Gizmos.color = Color.clear;
    }
    #endregion
}

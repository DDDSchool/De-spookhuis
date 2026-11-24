using DG.Tweening;
using UnityEngine;

[DisallowMultipleComponent] //disable multipuzzel in one
public class BasicGhostPuzzleKit : MonoBehaviour
{
    private bool alrSolved = false; //debounce
    
    public virtual void OnCreate(RoomManager room)
    {
        
    }

    protected virtual void Solve()
    {
        if (alrSolved) return;
        alrSolved = true;

        //yeet the ghost up for testing
        transform.DOMove(transform.position + Vector3.up * 5, 5)
         .OnComplete(() => Destroy(gameObject));

        GameManager.CaughtGhost();
    }
}

using UnityEngine;

public class Player : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Awake()
    {
        GameManager.player = this; //to get plr easier
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

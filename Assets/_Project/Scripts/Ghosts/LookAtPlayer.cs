using UnityEngine;

public class LookAtPlayer : MonoBehaviour
{
    [Tooltip("Alleen om de verticale as draaien, zodat het rechtop blijft staan (voor het spook-plaatje). Uit = helemaal naar de camera kantelen (gedachtebel).")]
    [SerializeField] bool onlyTurnAroundY = false;

    Transform target => Camera.main.transform;

    void Update()
    {
        Vector3 lookPoint = target.position;
        if (onlyTurnAroundY) lookPoint.y = transform.position.y;

        transform.LookAt(lookPoint);
        transform.Rotate(new Vector3(0, 180, 0));//flip it
    }
}

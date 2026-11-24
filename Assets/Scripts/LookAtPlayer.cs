using UnityEngine;

public class LookAtPlayer : MonoBehaviour
{
    Transform target => Camera.main.transform;

    void Update()
    {
        transform.LookAt(target);
        transform.Rotate(new Vector3(0, 180, 0));//flip it
    }
}

using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

// Een voorwerp dat je weggooit of laat vallen, ligt na een paar seconden weer op zijn plek.
// Zo kan een puzzel nooit mislukken (GAME_DESIGN.md §3). Zit het in een socket (bijvoorbeeld de geefzone),
// dan blijft het daar: het telt alleen als niemand en niets het vasthoudt.
[RequireComponent(typeof(XRGrabInteractable))]
public class ReturnToStart : MonoBehaviour
{
    [SerializeField] GameSettings settings;

    XRGrabInteractable grab;
    Rigidbody body;
    Vector3 startPosition;
    Quaternion startRotation;
    float timeAway;

    void Awake()
    {
        grab = GetComponent<XRGrabInteractable>();
        body = GetComponent<Rigidbody>();
        startPosition = transform.position;
        startRotation = transform.rotation;
    }

    void Update()
    {
        float awayDistance = settings.returnMovedDistance;
        bool moved = (transform.position - startPosition).sqrMagnitude > awayDistance * awayDistance;
        if (grab.isSelected || !moved)
        {
            timeAway = 0f;
            return;
        }

        timeAway += Time.deltaTime;
        if (timeAway >= settings.returnDelay) ReturnNow();
    }

    void ReturnNow()
    {
        timeAway = 0f;
        body.linearVelocity = Vector3.zero;
        body.angularVelocity = Vector3.zero;
        body.position = startPosition;
        body.rotation = startRotation;
        transform.SetPositionAndRotation(startPosition, startRotation);
    }
}

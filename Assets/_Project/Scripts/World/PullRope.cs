using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Interactables;
using UnityEngine.XR.Interaction.Toolkit.Interactors;

// Een touw met een handvat dat je omlaag trekt (testscene, pathway les 2.1).
// Hoe verder je trekt, hoe harder de controller trilt die het handvat vasthoudt.
// Laat je los, dan veert het handvat terug omhoog. Het touw zelf is een LineRenderer van de katrol naar het handvat.
// Het handvat kan alleen op en neer: dat regelen de Constraints op de Rigidbody (X, Z en draaien staan vast).
[RequireComponent(typeof(XRGrabInteractable))]
public class PullRope : MonoBehaviour
{
    [SerializeField] GameSettings settings;
    [SerializeField] HapticsManager haptics;
    [SerializeField] LineRenderer rope;
    [Tooltip("Het punt bovenaan (de katrol) waar het touw vandaan komt.")]
    [SerializeField] Transform pulley;

    XRGrabInteractable grab;
    Rigidbody body;
    Vector3 restPosition;
    float nextPulseTime;

    void Awake()
    {
        grab = GetComponent<XRGrabInteractable>();
        body = GetComponent<Rigidbody>();
        restPosition = transform.position;
    }

    void Update()
    {
        rope.SetPosition(0, pulley.position);
        rope.SetPosition(1, transform.position);

        if (!grab.isSelected || Time.time < nextPulseTime) return;
        nextPulseTime = Time.time + settings.pullPulseInterval;

        float pulled = Mathf.Clamp01((restPosition.y - transform.position.y) / settings.pullMaxDistance); // 0 = niet, 1 = helemaal
        if (pulled <= 0f) return;

        // Tril in de hand die het handvat vasthoudt.
        bool leftHand = grab.firstInteractorSelecting.handedness == InteractorHandedness.Left;
        haptics.Pulse(leftHand ? HapticsManager.Hand.Left : HapticsManager.Hand.Right, pulled * settings.pullMaxStrength, settings.pullPulseInterval);
    }

    void FixedUpdate()
    {
        Vector3 position = body.position;
        float lowest = restPosition.y - settings.pullMaxDistance;

        if (grab.isSelected)
        {
            // Vastgehouden: alleen tegenhouden als je verder trekt dan het touw lang is.
            if (position.y >= lowest && position.y <= restPosition.y) return;
            position.y = Mathf.Clamp(position.y, lowest, restPosition.y);
            body.position = position;
            body.linearVelocity = Vector3.zero;
            return;
        }

        // Losgelaten: rustig terug omhoog veren.
        body.MovePosition(Vector3.MoveTowards(position, restPosition, settings.pullReturnSpeed * Time.fixedDeltaTime));
    }
}

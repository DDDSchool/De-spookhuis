using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

// De zaklamp: pak hem en druk op de trekker om hem aan of uit te zetten (activation events, pathway les 2.2).
// Bundelhoek en bereik komen uit GameSettings. Spoken opsporen met de bundel (kaart S04) komt later.
[RequireComponent(typeof(XRGrabInteractable))]
public class Flashlight : MonoBehaviour
{
    [SerializeField] GameSettings settings;
    [SerializeField] Light beam;
    [SerializeField] bool startOn;

    XRGrabInteractable grab;

    public bool IsOn { get; private set; }

    void Awake()
    {
        grab = GetComponent<XRGrabInteractable>();
        beam.spotAngle = settings.beamAngle;
        beam.range = settings.beamRange;
        SetOn(startOn);
    }

    // "activated" gaat af als je de trekker indrukt terwijl je de zaklamp vasthoudt.
    void OnEnable() => grab.activated.AddListener(OnTrigger);
    void OnDisable() => grab.activated.RemoveListener(OnTrigger);

    void OnTrigger(ActivateEventArgs args) => SetOn(!IsOn);

    public void SetOn(bool on)
    {
        IsOn = on;
        beam.enabled = on;
    }
}

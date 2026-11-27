using UnityEngine;
using UnityEngine.AdaptivePerformance;
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
    [SerializeField] Transform target;

    XRGrabInteractable grab;

    public bool IsOn { get; private set; }

    void Awake()
    {
        grab = GetComponent<XRGrabInteractable>();
        beam.spotAngle = settings.beamAngle;
        beam.range = settings.beamRange;
        SetOn(startOn);
    }
    void Update()
    {
        if (IsOn)
        {
            Vector3 toGhost = target.position - beam.transform.position;
            float angle = Vector3.Angle(beam.transform.forward, toGhost);

            float distance = toGhost.magnitude;

            bool inBeam = (angle < settings.beamAngle / 2) && (distance < settings.beamRange);

            if (inBeam)
            {
                RaycastHit hit;
                

                if (Physics.Raycast(beam.transform.position, toGhost, out hit, distance) && hit.transform.IsChildOf(target))
                {
                    Debug.Log("Hit");
                }
                
            }
        }   
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
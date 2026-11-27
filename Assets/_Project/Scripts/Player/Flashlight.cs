using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

// De zaklamp: pak hem en druk op de trekker om hem aan of uit te zetten (activation events, pathway les 2.2).
// Het licht is paars (UV): een spook in de bundel wordt langzaam zichtbaar (GhostReveal).
// Bundelhoek en bereik komen uit GameSettings.
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

    void Update()
    {
        if (!IsOn) return;

        // Alle spoken langs (ze melden zich zelf aan in GhostReveal); meestal is dat er maar één.
        for (int i = 0; i < GhostReveal.All.Count; i++)
        {
            GhostReveal ghost = GhostReveal.All[i];
            if (InBeam(ghost)) ghost.Light();
        }
    }

    // Viktors bundel-check: binnen de hoek en het bereik, en niets (muur, kast) ertussen.
    bool InBeam(GhostReveal ghost)
    {
        Vector3 toGhost = ghost.Center - beam.transform.position;
        float angle = Vector3.Angle(beam.transform.forward, toGhost);
        float distance = toGhost.magnitude;

        bool inBeam = (angle < settings.beamAngle / 2) && (distance < settings.beamRange);
        if (!inBeam) return false;

        // De straal raakt eerst de vangzone (een trigger) van het spook; daarom triggers meenemen.
        if (!Physics.Raycast(beam.transform.position, toGhost, out RaycastHit hit, distance, Physics.DefaultRaycastLayers, QueryTriggerInteraction.Collide))
            return true; // niets geraakt: vrij zicht
        return hit.transform.IsChildOf(ghost.transform);
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

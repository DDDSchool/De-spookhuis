using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEngine.XR.Interaction.Toolkit.Interactables;
using UnityEngine.XR.Interaction.Toolkit.Interactors;

// De zaklamp ligt eerst op tafel met een bordje "Pak me op!".
// Heb je hem eenmaal gepakt en laat je hem los, dan gaat hij meteen terug in de houder aan je riem
// (Viktors Zaklamp_Holster: een XR Socket Interactor op de speler, pathway les 1.4)
// in plaats van op de grond te vallen. Zo raak je hem nooit kwijt.
[RequireComponent(typeof(XRGrabInteractable))]
public class ReturnToHolster : MonoBehaviour
{
    [SerializeField] XRSocketInteractor holster;
    [Tooltip("Bordje bij de startplek; verdwijnt zodra je de zaklamp voor het eerst pakt.")]
    [SerializeField] GameObject pickMeUpLabel;

    XRGrabInteractable grab;
    bool goHome;

    void Awake()
    {
        grab = GetComponent<XRGrabInteractable>();
        // Niet terug naar de oude ouder (de gangtafel): die kamer staat uit als je ergens anders bent,
        // en dan zou de zaklamp mee uitgaan.
        grab.retainTransformParent = false;
    }

    void OnEnable()
    {
        grab.selectEntered.AddListener(OnGrabbed);
        grab.selectExited.AddListener(OnReleased);
    }

    void OnDisable()
    {
        grab.selectEntered.RemoveListener(OnGrabbed);
        grab.selectExited.RemoveListener(OnReleased);
    }

    void OnGrabbed(SelectEnterEventArgs args)
    {
        if (pickMeUpLabel) pickMeUpLabel.SetActive(false);
    }

    void OnReleased(SelectExitEventArgs args)
    {
        // Uit de houder gehaald? Dan niets doen: je hebt hem nu in je hand.
        if (holster && args.interactorObject != (IXRSelectInteractor)holster) goHome = true;
    }

    // Eén frame later terugzetten, niet midden in het loslaten (de Interaction Manager is dan nog bezig).
    void Update()
    {
        if (!goHome) return;
        if (grab.isSelected) { goHome = false; return; } // alweer vastgepakt, bijvoorbeeld met je andere hand
        if (!holster.CanSelect((IXRSelectInteractable)grab)) return; // houder wacht nog even (Recycle Delay Time)

        holster.interactionManager.SelectEnter((IXRSelectInteractor)holster, (IXRSelectInteractable)grab);
        goHome = false;
    }
}

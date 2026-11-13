using Unity.XR.CoreUtils;
using UnityEngine;
using UnityEngine.XR;
using UnityEngine.XR.Interaction.Toolkit.Locomotion.Movement;
using UnityEngine.XR.Interaction.Toolkit.Locomotion.Turning;
using UnityEngine.XR.Interaction.Toolkit.Samples.StarterAssets;

// Zet de comfort-keuzes op de speler: teleport of vloeiend lopen, vignet, zittend spelen en volume.
// De startwaarden komen uit GameSettings; het comfort-menu roept de Set-functies aan.
// Waarom alleen de linker controller? In de XR Origin van het pathway loopt de linker stick,
// en doet de rechter stick altijd teleport en snap turn.
public class ComfortSettings : MonoBehaviour
{
    [SerializeField] GameSettings settings;
    [SerializeField] ControllerInputActionManager leftController;
    [SerializeField] ContinuousMoveProvider moveProvider;
    [SerializeField] SnapTurnProvider snapTurnProvider;
    [Tooltip("De Mesh Renderer van de TunnelingVignette onder de camera.")]
    [SerializeField] Renderer vignette;
    [Tooltip("De XR Origin van de speler (nodig voor zittend spelen).")]
    [SerializeField] XROrigin xrOrigin;

    public bool SmoothMove { get; private set; }
    public bool VignetteOn { get; private set; }
    public bool Seated { get; private set; }
    public float Volume { get; private set; }

    void Awake()
    {
        // Eerst alleen de keuzes onthouden, zodat het menu ze in Start al kan lezen.
        SmoothMove = settings.smoothMoveAtStart;
        VignetteOn = settings.vignetteAtStart;
        Volume = Mathf.Min(settings.startVolume, settings.volumeCap);
    }

    void Start()
    {
        moveProvider.moveSpeed = settings.moveSpeed;
        snapTurnProvider.turnAmount = settings.snapTurnDegrees;
        SetSmoothMove(SmoothMove);
        SetVignette(VignetteOn);
        SetVolume(Volume);
    }

    void LateUpdate()
    {
        // De XR Origin zet de camerahoogte opnieuw als je recentert (Meta-knop ingedrukt houden).
        // Zittend zetten we daarom elke frame de juiste hoogte terug; dat kost bijna niets.
        if (Seated) ApplyHeight();
    }

    public void SetSmoothMove(bool on)
    {
        SmoothMove = on;
        leftController.smoothMotionEnabled = on; // aan = linker stick loopt, uit = linker stick teleporteert
    }

    public void SetVignette(bool on)
    {
        // Alleen het beeld aan of uit: de vignet-controller blijft draaien, zodat hij blijft bijhouden of je loopt.
        VignetteOn = on;
        vignette.enabled = on;
    }

    public void SetSeated(bool seated)
    {
        Seated = seated;
        ApplyHeight();
    }

    public void SetVolume(float volume)
    {
        Volume = Mathf.Min(volume, settings.volumeCap); // nooit boven het volumeplafond
        AudioListener.volume = Volume;
    }

    void ApplyHeight()
    {
        // Zelfde regel als de XR Origin: op de vloer (de Quest) is de basis 0, anders de standaard camerahoogte
        // (ook in de editor zonder bril). Zittend komt daar een stukje bij, zodat je even hoog kijkt als staand.
        bool onFloor = xrOrigin.CurrentTrackingOriginMode == TrackingOriginModeFlags.Floor;
        float baseHeight = onFloor ? 0f : xrOrigin.CameraYOffset;

        float target = baseHeight + (Seated ? settings.seatedExtraHeight : 0f);
        Transform cameraOffset = xrOrigin.CameraFloorOffsetObject.transform;
        Vector3 position = cameraOffset.localPosition;
        if (Mathf.Approximately(position.y, target)) return;
        position.y = target;
        cameraOffset.localPosition = position;
    }
}

using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Locomotion.Movement;
using UnityEngine.XR.Interaction.Toolkit.Locomotion.Turning;
using UnityEngine.XR.Interaction.Toolkit.Samples.StarterAssets;

// Zet de comfort-keuzes op de speler: teleport of vloeiend lopen, en het vignet.
// De startwaarden komen uit GameSettings; het comfort-menu roept SetSmoothMove en SetVignette aan.
// Waarom alleen de linker controller? In de XR Origin van het pathway loopt de linker stick,
// en doet de rechter stick altijd teleport en snap turn.
public class ComfortSettings : MonoBehaviour
{
    [SerializeField] GameSettings settings;
    [SerializeField] ControllerInputActionManager leftController;
    [SerializeField] ContinuousMoveProvider moveProvider;
    [SerializeField] SnapTurnProvider snapTurnProvider;
    [SerializeField] GameObject vignette;

    public bool SmoothMove { get; private set; }
    public bool VignetteOn { get; private set; }

    void Awake()
    {
        // Eerst alleen de keuzes onthouden, zodat het menu ze in Start al kan lezen.
        SmoothMove = settings.smoothMoveAtStart;
        VignetteOn = settings.vignetteAtStart;
    }

    void Start()
    {
        moveProvider.moveSpeed = settings.moveSpeed;
        snapTurnProvider.turnAmount = settings.snapTurnDegrees;
        SetSmoothMove(SmoothMove);
        SetVignette(VignetteOn);
    }

    public void SetSmoothMove(bool on)
    {
        SmoothMove = on;
        leftController.smoothMotionEnabled = on; // aan = linker stick loopt, uit = linker stick teleporteert
    }

    public void SetVignette(bool on)
    {
        VignetteOn = on;
        vignette.SetActive(on);
    }
}

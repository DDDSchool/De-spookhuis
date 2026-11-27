using TMPro;
using UnityEngine;
using UnityEngine.UI;

// Paneel aan het einde van een ronde: "Gevangen!" of "Te bang!", met de knop Opnieuw.
// GameManager maakt het aan (prefab in GameManagerConfig > End Screen) en roept Show aan.
// Het paneel verschijnt één keer recht voor je hoofd; het volgt je niet (geen gedwongen beweging).
public class EndScreen : MonoBehaviour
{
    [SerializeField] TMP_Text title;
    [SerializeField] TMP_Text message;
    [SerializeField] Button retryButton;

    [Header("Teksten")]
    [SerializeField] string winTitle = "Gevangen!";
    [SerializeField, TextArea] string winMessage = "Je hebt alle spoken gevangen. Het huis is weer een beetje minder eng.";
    [SerializeField] string loseTitle = "Te bang!";
    [SerializeField, TextArea] string loseMessage = "Het spook won deze keer. Probeer het nog eens: zoek de beer en geef hem aan het spook.";

    void Awake()
    {
        retryButton.onClick.AddListener(GameManager.Restart);
    }

    public void Show(bool won)
    {
        title.text = won ? winTitle : loseTitle;
        message.text = won ? winMessage : loseMessage;
        PlaceInFrontOfHead();
    }

    void PlaceInFrontOfHead()
    {
        Camera cam = Camera.main;
        if (!cam) return;

        // Alleen horizontaal vooruit, zodat het paneel rechtop staat, ook als je naar de grond kijkt.
        Vector3 forward = Vector3.ProjectOnPlane(cam.transform.forward, Vector3.up);
        if (forward.sqrMagnitude < 0.001f) forward = cam.transform.up; // recht omhoog of omlaag gekeken
        forward.Normalize();

        // Staat er een muur of kast in de weg, dan het paneel vóór die muur zetten; anders zie je het niet
        // en kun je niet op Opnieuw drukken.
        GameSettings settings = GameManager.config.settings;
        float distance = settings.endPanelDistance;
        if (Physics.Raycast(cam.transform.position, forward, out RaycastHit hit, distance, Physics.DefaultRaycastLayers, QueryTriggerInteraction.Ignore))
            distance = Mathf.Max(hit.distance - settings.endPanelWallGap, settings.endPanelMinDistance);

        transform.position = cam.transform.position + forward * distance;
        transform.rotation = Quaternion.LookRotation(forward, Vector3.up);
    }
}

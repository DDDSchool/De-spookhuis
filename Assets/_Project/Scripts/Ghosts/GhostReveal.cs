using System.Collections.Generic;
using UnityEngine;

// Een spook is onzichtbaar tot je er met de paarse UV-zaklamp op schijnt.
// Zolang de bundel het raakt, wordt het langzaam zichtbaar; daarna vervaagt het weer langzaam.
// De gedachtebel (welk voorwerp het wil) komt en gaat mee.
// Staat er geen zaklamp in de scene (bijvoorbeeld een testscene), dan is het spook gewoon zichtbaar.
public class GhostReveal : MonoBehaviour
{
    // Alle spoken die nu aan staan. De zaklamp loopt deze lijst langs:
    // spoken worden pas bij de start gemaakt, dus je kunt ze niet vooraf in de zaklamp slepen.
    public static readonly List<GhostReveal> All = new();

    [SerializeField] Renderer card;      // het spook-plaatje
    [SerializeField] CanvasGroup bubble; // de gedachtebel

    public float Visibility { get; private set; } // 0 = verborgen, 1 = helemaal zichtbaar
    public Vector3 Center => card.transform.position;

    static readonly int BaseColorId = Shader.PropertyToID("_BaseColor");
    GameSettings settings;
    MaterialPropertyBlock block;
    Color baseColor;
    bool litThisFrame;
    bool needsLight = true;

    void Awake()
    {
        settings = GameManager.config.settings;
        block = new MaterialPropertyBlock();
        baseColor = card.sharedMaterial.GetColor(BaseColorId);

        // Eén keer zoeken (niet elke frame). Ook zaklampen in een kamer die nu uit staat tellen mee.
        needsLight = FindAnyObjectByType<Flashlight>(FindObjectsInactive.Include) != null;
        Visibility = needsLight ? 0f : 1f;
        Apply();
    }

    void OnEnable() => All.Add(this);
    void OnDisable() => All.Remove(this);

    // De zaklamp roept dit aan in elke frame dat het spook in de bundel staat.
    public void Light() => litThisFrame = true;

    // Bij vangen: helemaal zichtbaar, zodat je het spook ziet wegvliegen.
    public void ShowFully()
    {
        needsLight = false;
        Visibility = 1f;
        Apply();
    }

    // LateUpdate: na de Update van de zaklamp, zodat Light() van deze frame al binnen is.
    void LateUpdate()
    {
        if (!needsLight) return;

        float speed = litThisFrame ? 1f / settings.ghostRevealSeconds : -1f / settings.ghostFadeSeconds;
        litThisFrame = false;

        float next = Mathf.Clamp01(Visibility + speed * Time.deltaTime);
        if (next == Visibility) return; // niets veranderd: niets te doen
        Visibility = next;
        Apply();
    }

    void Apply()
    {
        Color color = baseColor;
        color.a = Mathf.Lerp(settings.ghostHiddenAlpha, baseColor.a, Visibility);

        card.GetPropertyBlock(block);
        block.SetColor(BaseColorId, color);
        card.SetPropertyBlock(block);
        card.enabled = color.a > 0.001f; // helemaal weg: niet tekenen (scheelt werk op de Quest)

        if (bubble) bubble.alpha = Visibility;
    }
}

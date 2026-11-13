using UnityEngine;
using UnityEngine.UI;

// Comfort-paneel met twee schakelaars die ComfortSettings aansturen.
// Dit is het begin van het comfort-menu uit GAME_DESIGN.md §8 (kaart U03).
public class ComfortMenu : MonoBehaviour
{
    [SerializeField] ComfortSettings comfort;
    [SerializeField] Toggle smoothMoveToggle;
    [SerializeField] Toggle vignetteToggle;

    void Start()
    {
        // Laat de schakelaars zien wat er nu aan staat, zonder meteen iets te veranderen.
        smoothMoveToggle.SetIsOnWithoutNotify(comfort.SmoothMove);
        vignetteToggle.SetIsOnWithoutNotify(comfort.VignetteOn);

        smoothMoveToggle.onValueChanged.AddListener(comfort.SetSmoothMove);
        vignetteToggle.onValueChanged.AddListener(comfort.SetVignette);
    }
}

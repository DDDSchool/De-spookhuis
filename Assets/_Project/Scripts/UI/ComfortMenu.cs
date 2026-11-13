using UnityEngine;
using UnityEngine.UI;

// Comfort-paneel met schakelaars en een volumeschuif die ComfortSettings aansturen.
// Dit is het begin van het comfort-menu uit GAME_DESIGN.md §8 (kaart U03).
public class ComfortMenu : MonoBehaviour
{
    [SerializeField] ComfortSettings comfort;
    [SerializeField] Toggle smoothMoveToggle;
    [SerializeField] Toggle vignetteToggle;
    [SerializeField] Toggle seatedToggle;
    [SerializeField] Slider volumeSlider;

    void Start()
    {
        // Laat zien wat er nu aan staat, zonder meteen iets te veranderen.
        smoothMoveToggle.SetIsOnWithoutNotify(comfort.SmoothMove);
        vignetteToggle.SetIsOnWithoutNotify(comfort.VignetteOn);
        seatedToggle.SetIsOnWithoutNotify(comfort.Seated);
        volumeSlider.SetValueWithoutNotify(comfort.Volume);

        smoothMoveToggle.onValueChanged.AddListener(comfort.SetSmoothMove);
        vignetteToggle.onValueChanged.AddListener(comfort.SetVignette);
        seatedToggle.onValueChanged.AddListener(comfort.SetSeated);
        volumeSlider.onValueChanged.AddListener(OnVolumeChanged);
    }

    void OnVolumeChanged(float value)
    {
        comfort.SetVolume(value);
        // Boven het plafond springt de schuif terug, zodat de speler ziet dat hier de grens ligt.
        volumeSlider.SetValueWithoutNotify(comfort.Volume);
    }
}

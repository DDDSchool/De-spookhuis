using TMPro;
using UnityEngine;

// Laat zien hoeveel beelden per seconde (fps) de game haalt. Doel op de Quest: 72 fps (pathway les 3.2).
// Het getal wordt twee keer per seconde bijgewerkt, zodat het leesbaar blijft.
public class FpsCounter : MonoBehaviour
{
    [SerializeField] TMP_Text label;
    [Tooltip("Om de hoeveel seconden het getal wordt bijgewerkt.")]
    [SerializeField] float updateEvery = 0.5f;

    int frames;
    float timer;

    void Update()
    {
        frames++;
        timer += Time.unscaledDeltaTime;
        if (timer < updateEvery) return;

        label.SetText("{0:0} fps", frames / timer); // SetText maakt geen nieuwe tekst in het geheugen aan
        frames = 0;
        timer = 0f;
    }
}

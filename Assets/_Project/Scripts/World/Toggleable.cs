using UnityEngine;
using UnityEngine.Events;

// Iets dat aan of uit kan: een radio, een lampje, een groep lichten.
// Roep Toggle() aan vanuit een knop, een ray-klik of een activation event (pathway les 2.2 en 2.3).
// Andere scripts, bijvoorbeeld een puzzel, kunnen luisteren naar onChanged.
public class Toggleable : MonoBehaviour
{
    [Tooltip("Wat aan en uit gaat, bijvoorbeeld het geluid van de radio of het peertje van een lamp.")]
    [SerializeField] GameObject target;
    [SerializeField] bool isOn;
    public UnityEvent<bool> onChanged; // true = aan

    public bool IsOn => isOn;

    // Bij de start alleen de juiste stand laten zien; onChanged gaat pas af als iemand echt iets omzet.
    void Start() => target.SetActive(isOn);

    public void Toggle() => Set(!isOn);

    public void Set(bool on)
    {
        isOn = on;
        target.SetActive(on);
        onChanged.Invoke(on);
    }
}

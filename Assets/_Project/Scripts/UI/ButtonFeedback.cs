using TMPro;
using UnityEngine;

// Laat op een paneel zien op welke knop je klikte. Voor de UI-plek in de testscene (pathway les 2.4).
// Koppel een knop in de Inspector aan Show en vul de tekst in.
public class ButtonFeedback : MonoBehaviour
{
    [SerializeField] TMP_Text label;

    public void Show(string message) => label.text = message;
}

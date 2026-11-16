using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;

public class InteractableTrigger : MonoBehaviour
{
    public virtual void OnHover(HoverEnterEventArgs args)
    {
        OutLine(true);
        //print("hover");
    }

    public virtual void OnHoverExit(HoverExitEventArgs args)
    {
        OutLine(false);
        //print("hoveroff");
    }

    public virtual void Trigger(SelectEnterEventArgs args)
    {
        //print("trigger");
    }

    void OutLine(bool state)
    {
        //for now to test
        GetComponent<Outline>().enabled = state;
    }
}

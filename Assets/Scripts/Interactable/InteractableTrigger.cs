using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;

public class InteractableTrigger : MonoBehaviour
{
    protected Outline outline;

    protected virtual void Start()
    {
        outline = GetComponent<Outline>();
        outline.enabled = false;
    }

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

    protected virtual void OutLine(bool state)
    {
        outline.enabled = state;
    }
}

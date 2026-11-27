using System.Collections;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

public class Grabable: InteractableTrigger
{
    private XRGrabInteractable grabInteractable;

    private bool isHighLighted = false;
    private bool isHolding => grabInteractable.isSelected;

    protected override void Start()
    {
        base.Start();

        grabInteractable = GetComponent<XRGrabInteractable>();
    }

    IEnumerator WaitForLettingGo()
    {
        yield return new WaitUntil(() => !isHolding);
        outline.enabled = isHighLighted;
    }

    public override void Trigger(SelectEnterEventArgs args)
    {
        outline.enabled = false;
        StartCoroutine(WaitForLettingGo());
    }

    protected override void OutLine(bool state)
    {
        isHighLighted = state;
        if (isHolding) return;

        base.OutLine(state);
    }
}

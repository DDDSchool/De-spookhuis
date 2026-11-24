using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

[RequireComponent(typeof(XRGrabInteractable), typeof(Rigidbody))]
public class PhysicsOnTouch : MonoBehaviour
{
    //it is only needed for drawer

    private LayerMask antiLayer;
    private Transform owner;
    private Rigidbody rb;

    private bool physics = false;
    const string antiLayerName = "furniture";

    void Start()
    {
        owner = transform.parent;
        rb = GetComponent<Rigidbody>();
        rb.constraints = RigidbodyConstraints.FreezeAll;
        XRGrabInteractable grabInteractable = GetComponent<XRGrabInteractable>();
        grabInteractable.selectEntered.AddListener(Trigger);
        antiLayer = LayerMask.NameToLayer(antiLayerName);

        bool succes = TryGetComponent<ReturnToStart>(out ReturnToStart returnToStart);
        if (!succes) return;
        returnToStart.OnHome += Reset;
    }

    void OnCollisionEnter(Collision collision)
    {
        if (physics || collision.transform.IsChildOf(owner) || collision.gameObject.layer == antiLayer) return;
        print($"hit by {collision.gameObject.name}");
        physics = true;

        rb.constraints = RigidbodyConstraints.None;
    }

    public void Trigger(SelectEnterEventArgs arg)
    {
        physics = true;
        rb.constraints = RigidbodyConstraints.None;
    }

    public void Reset()
    {
        print("reset");
        rb.constraints = RigidbodyConstraints.FreezeAll;
        physics = false;
    }
}

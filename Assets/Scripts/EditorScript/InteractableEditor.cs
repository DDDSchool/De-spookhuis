using UnityEngine;
using UnityEditor;
using UnityEngine.XR.Interaction.Toolkit.Interactables;
using System;
using Unity.VisualScripting;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEditor.Events;

[CustomEditor(typeof(InteractableTrigger), true)]
public class InteractableEditor: Editor
{
    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();
        InteractableTrigger interactableTrigger = (InteractableTrigger)target;
        GUILayout.Space(20);

        //check or it is alr done
        bool succes = interactableTrigger.gameObject.GetComponent<XRSimpleInteractable>();
        if (succes)
        {
            //say it is done
            GUILayout.Label("It is already done");
        }
        else
        {
            if (GUILayout.Button("Setup")) Setup();
        }

        void Setup()
        {
            XRSimpleInteractable newInteractable = Undo.AddComponent<XRSimpleInteractable>(interactableTrigger.gameObject);
            newInteractable.interactionManager = GameObject.FindFirstObjectByType<XRInteractionManager>();

            //events
            UnityEventTools.AddPersistentListener(newInteractable.firstHoverEntered, interactableTrigger.OnHover);
            UnityEventTools.AddPersistentListener(newInteractable.lastHoverExited, interactableTrigger.OnHoverExit);
            UnityEventTools.AddPersistentListener(newInteractable.selectEntered, interactableTrigger.Trigger);

            EditorUtility.SetDirty(newInteractable);
            EditorUtility.SetDirty(interactableTrigger);
        }
    }
}

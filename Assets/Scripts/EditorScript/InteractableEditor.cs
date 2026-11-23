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
        bool succes = IsAlreadyDone();
        if (succes)
        {
            //say it is done
            GUILayout.Label("It is already done");
            if (!IsGrable() || interactableTrigger.gameObject.GetComponent<ReturnToStart>()) return;

            GUILayout.Space(10);
            GUILayout.Label("u can add return to start");
        }
        else
        {
            if (GUILayout.Button("Setup")) Setup();
        }

        void Setup()
        {
            if (IsGrable()) GrabableSetup();
            else InteractableSetup();

            void InteractableSetup()
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

            void GrabableSetup()
            {
                XRGrabInteractable newInteractable = Undo.AddComponent<XRGrabInteractable>(interactableTrigger.gameObject);
                newInteractable.interactionManager = GameObject.FindFirstObjectByType<XRInteractionManager>();

                //events
                UnityEventTools.AddPersistentListener(newInteractable.firstHoverEntered, interactableTrigger.OnHover);
                UnityEventTools.AddPersistentListener(newInteractable.lastHoverExited, interactableTrigger.OnHoverExit);
                UnityEventTools.AddPersistentListener(newInteractable.selectEntered, interactableTrigger.Trigger);

                EditorUtility.SetDirty(newInteractable);
                EditorUtility.SetDirty(interactableTrigger);
            }
        }
    
        bool IsAlreadyDone()
        {
            if (IsGrable()) return interactableTrigger.gameObject.GetComponent<XRGrabInteractable>();
            else return interactableTrigger.gameObject.GetComponent<XRSimpleInteractable>();
        }

        bool IsGrable()
        {
            return target is Grabable;
        }
    }
}

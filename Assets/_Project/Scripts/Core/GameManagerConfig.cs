using System;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName = "GameManagerConfig", menuName = "Scriptable Objects/GameManagerConfig")]
public class GameManagerConfig : ScriptableObject
{
    [Serializable]
    public class GhostInfo
    {
        public GhostType ghostType;
        public GameObject ghost;
    }

    public GameObject xrSimulator;
    public GameObject roomLoadingScreen;
    [Tooltip("Paneel voor gewonnen en game-over, met de knop Opnieuw (Prefabs/UI/EindScherm).")]
    public GameObject endScreen;
    [Tooltip("Alle instelbare getallen (Data/GameSettings). Zo kan elk script erbij via GameManager.config.settings.")]
    public GameSettings settings;

    [Space(10)]
    [Header("Ghosts")]
    public List<GhostInfo> ghostInfo;

    [Space(10)]
    [Header("Configs")]
    public float roomSwitchingDur = .1f;
    [Tooltip("Hoe ver voor de camera het zwarte fade-scherm hangt, in meter. Een overlay-canvas zie je niet in de bril, daarom hangt het als vlak voor de camera.")]
    public float fadePlaneDistance = .3f;
}

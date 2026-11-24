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

    [Space(10)]
    [Header("Ghosts")]
    public List<GhostInfo> ghostInfo;

    [Space(10)]
    [Header("Configs")]
    public float roomSwitchingDur = .1f;
}

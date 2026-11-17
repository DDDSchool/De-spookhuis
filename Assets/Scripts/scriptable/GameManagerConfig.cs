using UnityEngine;

[CreateAssetMenu(fileName = "GameManagerConfig", menuName = "Scriptable Objects/GameManagerConfig")]
public class GameManagerConfig : ScriptableObject
{
    public GameObject xrSimulator;
    public GameObject roomLoadingScreen;

    [Header("Configs")]
    public float roomSwitchingDur = .1f;
}

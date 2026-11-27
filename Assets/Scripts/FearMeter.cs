using Unity.Mathematics;
using UnityEngine;
using UnityEngine.UI;

public class FearMeter : MonoBehaviour
{
    [Header("UI")]
    [SerializeField] private Slider slider;

    [SerializeField] private bool seeGhost = false;//test
    private float currentFear = 0f;

    //configs
    const float fearIncreaseASec = 2f;
    const float maxFear = 100;
    const float fearDecreaseACatch = 15f;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        GameManager.onGhostCaught += OnGhostCaught;
    }

    // Update is called once per frame
    void Update()
    {
        if (!CanIncreaseFear()) return;

        float nextFear = currentFear + fearIncreaseASec * Time.deltaTime;
        UpdateFear(nextFear);
    }

    public void OnGhostCaught()
    {
        float nextFear = currentFear - fearDecreaseACatch; //if it perfect it not workign so ima check that out later
        UpdateFear(nextFear);
    }

    //why update is bc when it decrease we also need it
    void UpdateFear(float nextFear)
    {
        currentFear = Mathf.Clamp(nextFear, 0, maxFear);
        float prog = currentFear != 0? currentFear / maxFear : 0; // 0 / 100 = error
        slider.value = prog;
    }

    bool CanIncreaseFear()
    {
        bool succes = !GameManager.AllGhostInRoomAreCatch() && !seeGhost;
        return succes;
    }
}

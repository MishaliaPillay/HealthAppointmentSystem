using HealthAppointmentSystem.Debugging;

namespace HealthAppointmentSystem;

public class HealthAppointmentSystemConsts
{
    public const string LocalizationSourceName = "HealthAppointmentSystem";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "363a1b817d904afaa0b8bbd3c04f1fbd";
}

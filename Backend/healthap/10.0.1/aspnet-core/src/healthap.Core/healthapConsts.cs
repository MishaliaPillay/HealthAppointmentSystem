using healthap.Debugging;

namespace healthap;

public class healthapConsts
{
    public const string LocalizationSourceName = "healthap";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "e297e1e36f1f4f73b8158eb08afdd5e4";
}

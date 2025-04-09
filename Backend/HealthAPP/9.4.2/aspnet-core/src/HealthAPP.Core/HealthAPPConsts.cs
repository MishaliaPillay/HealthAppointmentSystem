using HealthAPP.Debugging;

namespace HealthAPP
{
    public class HealthAPPConsts
    {
        public const string LocalizationSourceName = "HealthAPP";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "7620a50544024672827b5d57c8dd5959";
    }
}

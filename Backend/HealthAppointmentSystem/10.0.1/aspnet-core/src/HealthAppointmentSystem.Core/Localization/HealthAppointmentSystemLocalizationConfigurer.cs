using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace HealthAppointmentSystem.Localization;

public static class HealthAppointmentSystemLocalizationConfigurer
{
    public static void Configure(ILocalizationConfiguration localizationConfiguration)
    {
        localizationConfiguration.Sources.Add(
            new DictionaryBasedLocalizationSource(HealthAppointmentSystemConsts.LocalizationSourceName,
                new XmlEmbeddedFileLocalizationDictionaryProvider(
                    typeof(HealthAppointmentSystemLocalizationConfigurer).GetAssembly(),
                    "HealthAppointmentSystem.Localization.SourceFiles"
                )
            )
        );
    }
}

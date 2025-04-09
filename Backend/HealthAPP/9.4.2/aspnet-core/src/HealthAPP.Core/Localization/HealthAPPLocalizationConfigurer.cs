using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace HealthAPP.Localization
{
    public static class HealthAPPLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(HealthAPPConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(HealthAPPLocalizationConfigurer).GetAssembly(),
                        "HealthAPP.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}

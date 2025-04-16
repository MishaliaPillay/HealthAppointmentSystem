using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace healthap.Localization;

public static class healthapLocalizationConfigurer
{
    public static void Configure(ILocalizationConfiguration localizationConfiguration)
    {
        localizationConfiguration.Sources.Add(
            new DictionaryBasedLocalizationSource(healthapConsts.LocalizationSourceName,
                new XmlEmbeddedFileLocalizationDictionaryProvider(
                    typeof(healthapLocalizationConfigurer).GetAssembly(),
                    "healthap.Localization.SourceFiles"
                )
            )
        );
    }
}

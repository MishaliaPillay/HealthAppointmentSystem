using Abp.Localization;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Runtime.Security;
using Abp.Timing;
using Abp.Zero;
using Abp.Zero.Configuration;
using HealthAppointmentSystem.Authorization.Roles;
using HealthAppointmentSystem.Authorization.Users;
using HealthAppointmentSystem.Configuration;
using HealthAppointmentSystem.Localization;
using HealthAppointmentSystem.MultiTenancy;
using HealthAppointmentSystem.Timing;

namespace HealthAppointmentSystem;

[DependsOn(typeof(AbpZeroCoreModule))]
public class HealthAppointmentSystemCoreModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Auditing.IsEnabledForAnonymousUsers = true;

        // Declare entity types
        Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
        Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
        Configuration.Modules.Zero().EntityTypes.User = typeof(User);

        HealthAppointmentSystemLocalizationConfigurer.Configure(Configuration.Localization);

        // Enable this line to create a multi-tenant application.
        Configuration.MultiTenancy.IsEnabled = HealthAppointmentSystemConsts.MultiTenancyEnabled;

        // Configure roles
        AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);

        Configuration.Settings.Providers.Add<AppSettingProvider>();

        Configuration.Localization.Languages.Add(new LanguageInfo("fa", "فارسی", "famfamfam-flags ir"));

        Configuration.Settings.SettingEncryptionConfiguration.DefaultPassPhrase = HealthAppointmentSystemConsts.DefaultPassPhrase;
        SimpleStringCipher.DefaultPassPhrase = HealthAppointmentSystemConsts.DefaultPassPhrase;
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(HealthAppointmentSystemCoreModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
    }
}

using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using healthap.Configuration;
using healthap.EntityFrameworkCore;
using healthap.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace healthap.Migrator;

[DependsOn(typeof(healthapEntityFrameworkModule))]
public class healthapMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public healthapMigratorModule(healthapEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(healthapMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            healthapConsts.ConnectionStringName
        );

        Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        Configuration.ReplaceService(
            typeof(IEventBus),
            () => IocManager.IocContainer.Register(
                Component.For<IEventBus>().Instance(NullEventBus.Instance)
            )
        );
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(healthapMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}

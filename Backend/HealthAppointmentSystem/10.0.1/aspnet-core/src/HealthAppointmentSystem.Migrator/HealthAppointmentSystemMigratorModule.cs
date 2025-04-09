using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HealthAppointmentSystem.Configuration;
using HealthAppointmentSystem.EntityFrameworkCore;
using HealthAppointmentSystem.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace HealthAppointmentSystem.Migrator;

[DependsOn(typeof(HealthAppointmentSystemEntityFrameworkModule))]
public class HealthAppointmentSystemMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public HealthAppointmentSystemMigratorModule(HealthAppointmentSystemEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(HealthAppointmentSystemMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            HealthAppointmentSystemConsts.ConnectionStringName
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
        IocManager.RegisterAssemblyByConvention(typeof(HealthAppointmentSystemMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}

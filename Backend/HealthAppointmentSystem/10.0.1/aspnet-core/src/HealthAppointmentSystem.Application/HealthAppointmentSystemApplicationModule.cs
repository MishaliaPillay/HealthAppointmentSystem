using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HealthAppointmentSystem.Authorization;

namespace HealthAppointmentSystem;

[DependsOn(
    typeof(HealthAppointmentSystemCoreModule),
    typeof(AbpAutoMapperModule))]
public class HealthAppointmentSystemApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<HealthAppointmentSystemAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(HealthAppointmentSystemApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}

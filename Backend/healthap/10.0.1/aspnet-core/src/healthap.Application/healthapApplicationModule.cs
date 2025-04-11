using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using healthap.Authorization;

namespace healthap;

[DependsOn(
    typeof(healthapCoreModule),
    typeof(AbpAutoMapperModule))]
public class healthapApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<healthapAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(healthapApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}

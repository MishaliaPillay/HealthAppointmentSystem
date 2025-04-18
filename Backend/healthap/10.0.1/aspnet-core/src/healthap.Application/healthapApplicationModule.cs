using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using healthap.Authorization;
using healthap.Services.Institutions;
using AutoMapper;

namespace healthap
{
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

            // Register the AutoMapper profiles from this assembly (scans the entire assembly for Profile classes)
            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                cfg => cfg.AddMaps(thisAssembly)
            );

            IocManager.RegisterAssemblyByConvention(thisAssembly);
        }
    }
}

using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HealthAPP.Authorization;

namespace HealthAPP
{
    [DependsOn(
        typeof(HealthAPPCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class HealthAPPApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<HealthAPPAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(HealthAPPApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}

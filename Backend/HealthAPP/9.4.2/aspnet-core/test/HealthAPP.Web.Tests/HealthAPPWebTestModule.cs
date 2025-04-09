using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HealthAPP.EntityFrameworkCore;
using HealthAPP.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace HealthAPP.Web.Tests
{
    [DependsOn(
        typeof(HealthAPPWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class HealthAPPWebTestModule : AbpModule
    {
        public HealthAPPWebTestModule(HealthAPPEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HealthAPPWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(HealthAPPWebMvcModule).Assembly);
        }
    }
}
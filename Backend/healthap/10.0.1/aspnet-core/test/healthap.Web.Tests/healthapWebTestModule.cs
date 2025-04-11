using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using healthap.EntityFrameworkCore;
using healthap.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace healthap.Web.Tests;

[DependsOn(
    typeof(healthapWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class healthapWebTestModule : AbpModule
{
    public healthapWebTestModule(healthapEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(healthapWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(healthapWebMvcModule).Assembly);
    }
}
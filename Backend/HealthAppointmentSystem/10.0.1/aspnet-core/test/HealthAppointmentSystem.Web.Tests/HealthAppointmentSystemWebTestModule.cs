using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HealthAppointmentSystem.EntityFrameworkCore;
using HealthAppointmentSystem.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace HealthAppointmentSystem.Web.Tests;

[DependsOn(
    typeof(HealthAppointmentSystemWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class HealthAppointmentSystemWebTestModule : AbpModule
{
    public HealthAppointmentSystemWebTestModule(HealthAppointmentSystemEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(HealthAppointmentSystemWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(HealthAppointmentSystemWebMvcModule).Assembly);
    }
}
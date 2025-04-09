using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using HealthAppointmentSystem.EntityFrameworkCore.Seed;

namespace HealthAppointmentSystem.EntityFrameworkCore;

[DependsOn(
    typeof(HealthAppointmentSystemCoreModule),
    typeof(AbpZeroCoreEntityFrameworkCoreModule))]
public class HealthAppointmentSystemEntityFrameworkModule : AbpModule
{
    /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
    public bool SkipDbContextRegistration { get; set; }

    public bool SkipDbSeed { get; set; }

    public override void PreInitialize()
    {
        if (!SkipDbContextRegistration)
        {
            Configuration.Modules.AbpEfCore().AddDbContext<HealthAppointmentSystemDbContext>(options =>
            {
                if (options.ExistingConnection != null)
                {
                    HealthAppointmentSystemDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                }
                else
                {
                    HealthAppointmentSystemDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                }
            });
        }
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(HealthAppointmentSystemEntityFrameworkModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        if (!SkipDbSeed)
        {
            SeedHelper.SeedHostDb(IocManager);
        }
    }
}

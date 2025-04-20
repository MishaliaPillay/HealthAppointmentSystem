using Abp.Dependency;

using Abp.EntityFrameworkCore.Configuration;

using Abp.Modules;

using Abp.Reflection.Extensions;

using Abp.Zero.EntityFrameworkCore;

using healthap.EntityFrameworkCore.Seed;

using healthap.ExternalServices.GooglePlaces;

namespace healthap.EntityFrameworkCore;

[DependsOn(

    typeof(healthapCoreModule),

    typeof(AbpZeroCoreEntityFrameworkCoreModule))]

public class healthapEntityFrameworkModule : AbpModule

{

    /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */

    public bool SkipDbContextRegistration { get; set; }

    public bool SkipDbSeed { get; set; }

    public override void PreInitialize()

    {

        if (!SkipDbContextRegistration)

        {

            Configuration.Modules.AbpEfCore().AddDbContext<healthapDbContext>(options =>

            {

                if (options.ExistingConnection != null)

                {

                    healthapDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);

                }

                else

                {

                    healthapDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);

                }

            });

        }

    }

    public override void Initialize()

    {

        IocManager.RegisterAssemblyByConvention(typeof(healthapEntityFrameworkModule).GetAssembly());

        IocManager.Register<IGooglePlacesService, GooglePlacesService>(DependencyLifeStyle.Transient);

    }

    public override void PostInitialize()

    {

        if (!SkipDbSeed)

        {

            SeedHelper.SeedHostDb(IocManager);

        }

    }

}


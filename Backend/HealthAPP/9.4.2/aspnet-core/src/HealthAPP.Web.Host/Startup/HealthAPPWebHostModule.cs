using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HealthAPP.Configuration;

namespace HealthAPP.Web.Host.Startup
{
    [DependsOn(
       typeof(HealthAPPWebCoreModule))]
    public class HealthAPPWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public HealthAPPWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HealthAPPWebHostModule).GetAssembly());
        }
    }
}

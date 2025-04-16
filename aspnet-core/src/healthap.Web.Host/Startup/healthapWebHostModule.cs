using Abp.Modules;
using Abp.Reflection.Extensions;
using healthap.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace healthap.Web.Host.Startup
{
    [DependsOn(
       typeof(healthapWebCoreModule))]
    public class healthapWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public healthapWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(healthapWebHostModule).GetAssembly());
        }
    }
}

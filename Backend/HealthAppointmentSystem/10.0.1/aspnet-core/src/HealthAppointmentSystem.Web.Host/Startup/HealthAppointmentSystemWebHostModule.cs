using Abp.Modules;
using Abp.Reflection.Extensions;
using HealthAppointmentSystem.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace HealthAppointmentSystem.Web.Host.Startup
{
    [DependsOn(
       typeof(HealthAppointmentSystemWebCoreModule))]
    public class HealthAppointmentSystemWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public HealthAppointmentSystemWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HealthAppointmentSystemWebHostModule).GetAssembly());
        }
    }
}

using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace HealthAppointmentSystem.Controllers
{
    public abstract class HealthAppointmentSystemControllerBase : AbpController
    {
        protected HealthAppointmentSystemControllerBase()
        {
            LocalizationSourceName = HealthAppointmentSystemConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

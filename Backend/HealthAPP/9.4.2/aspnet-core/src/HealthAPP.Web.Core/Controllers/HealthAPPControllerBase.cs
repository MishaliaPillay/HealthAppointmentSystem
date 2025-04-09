using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace HealthAPP.Controllers
{
    public abstract class HealthAPPControllerBase: AbpController
    {
        protected HealthAPPControllerBase()
        {
            LocalizationSourceName = HealthAPPConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

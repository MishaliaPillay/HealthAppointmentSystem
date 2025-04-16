using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace healthap.Controllers
{
    public abstract class healthapControllerBase : AbpController
    {
        protected healthapControllerBase()
        {
            LocalizationSourceName = healthapConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

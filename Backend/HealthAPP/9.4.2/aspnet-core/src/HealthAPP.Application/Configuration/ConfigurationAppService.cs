using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using HealthAPP.Configuration.Dto;

namespace HealthAPP.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : HealthAPPAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

using Abp.Authorization;
using Abp.Runtime.Session;
using healthap.Configuration.Dto;
using System.Threading.Tasks;

namespace healthap.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : healthapAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}

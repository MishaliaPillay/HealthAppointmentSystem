using Abp.Authorization;
using Abp.Runtime.Session;
using HealthAppointmentSystem.Configuration.Dto;
using System.Threading.Tasks;

namespace HealthAppointmentSystem.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : HealthAppointmentSystemAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}

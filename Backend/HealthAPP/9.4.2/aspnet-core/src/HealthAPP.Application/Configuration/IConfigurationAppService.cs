using System.Threading.Tasks;
using HealthAPP.Configuration.Dto;

namespace HealthAPP.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

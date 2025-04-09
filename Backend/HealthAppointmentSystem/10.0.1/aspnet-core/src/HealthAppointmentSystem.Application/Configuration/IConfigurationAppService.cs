using HealthAppointmentSystem.Configuration.Dto;
using System.Threading.Tasks;

namespace HealthAppointmentSystem.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}

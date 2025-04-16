using healthap.Configuration.Dto;
using System.Threading.Tasks;

namespace healthap.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}

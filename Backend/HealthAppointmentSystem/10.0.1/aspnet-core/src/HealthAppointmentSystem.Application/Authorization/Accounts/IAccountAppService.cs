using Abp.Application.Services;
using HealthAppointmentSystem.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace HealthAppointmentSystem.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}

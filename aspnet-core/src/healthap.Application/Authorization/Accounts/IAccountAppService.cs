using Abp.Application.Services;
using healthap.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace healthap.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}

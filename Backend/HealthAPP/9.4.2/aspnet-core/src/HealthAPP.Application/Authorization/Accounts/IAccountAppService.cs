using System.Threading.Tasks;
using Abp.Application.Services;
using HealthAPP.Authorization.Accounts.Dto;

namespace HealthAPP.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}

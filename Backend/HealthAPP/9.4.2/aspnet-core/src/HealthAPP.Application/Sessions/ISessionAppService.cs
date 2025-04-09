using System.Threading.Tasks;
using Abp.Application.Services;
using HealthAPP.Sessions.Dto;

namespace HealthAPP.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

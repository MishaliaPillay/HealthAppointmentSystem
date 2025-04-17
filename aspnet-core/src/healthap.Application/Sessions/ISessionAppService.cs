using Abp.Application.Services;
using healthap.Sessions.Dto;
using System.Threading.Tasks;

namespace healthap.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}

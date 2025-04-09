using Abp.Application.Services;
using HealthAppointmentSystem.Sessions.Dto;
using System.Threading.Tasks;

namespace HealthAppointmentSystem.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}

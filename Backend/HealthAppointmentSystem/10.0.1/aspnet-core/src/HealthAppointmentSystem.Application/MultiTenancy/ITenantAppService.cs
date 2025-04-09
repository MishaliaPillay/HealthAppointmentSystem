using Abp.Application.Services;
using HealthAppointmentSystem.MultiTenancy.Dto;

namespace HealthAppointmentSystem.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}


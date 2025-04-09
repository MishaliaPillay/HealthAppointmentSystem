using Abp.Application.Services;
using HealthAPP.MultiTenancy.Dto;

namespace HealthAPP.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}


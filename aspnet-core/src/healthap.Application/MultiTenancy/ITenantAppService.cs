using Abp.Application.Services;
using healthap.MultiTenancy.Dto;

namespace healthap.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}


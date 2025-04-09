using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HealthAPP.MultiTenancy;

namespace HealthAPP.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}

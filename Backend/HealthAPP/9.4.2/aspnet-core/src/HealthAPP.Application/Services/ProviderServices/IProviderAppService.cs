using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HealthAPP.Services.ProviderServices.ProviderDto;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace HealthAPP.Services.ProviderServices.ProviderDto
{
    public interface IProviderAppService
    {
        Task<ProvidersDto> GetProviderAsync(Guid id);
        Task<PagedResultDto<ProvidersDto>> GetAllProvidersAsync(GetProvidersInput input);
        Task<ProvidersDto> CreateProviderAsync(CreateProviderDto input);
        Task<ProvidersDto> UpdateProviderAsync(UpdateProviderDto input);
        Task DeleteProviderAsync(Guid id);

    }
}

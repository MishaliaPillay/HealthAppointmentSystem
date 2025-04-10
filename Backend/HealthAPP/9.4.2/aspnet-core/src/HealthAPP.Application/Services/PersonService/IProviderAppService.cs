using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Application.Services;
using HealthAPP.Services.PersonService.Dto;

namespace HealthAPP.Services.PersonService
{
    //TODO: KM do more research on this PagedAndSortedResultRequestDto 
    public interface IProviderAppService : IAsyncCrudAppService<ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>
    {
        public Task<ProviderResponseDto> CreateAsync(ProviderRequestDto input);
        
    }
}

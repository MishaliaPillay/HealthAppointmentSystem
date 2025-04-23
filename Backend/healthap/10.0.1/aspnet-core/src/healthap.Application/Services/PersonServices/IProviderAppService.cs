using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices
{
    
    public interface IProviderAppService : IAsyncCrudAppService<ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>
    {
        public Task<ProviderResponseDto> GetCurrentProviderAsync(long userId);
        public Task<ProviderResponseDto> UpdateproviderAsync(UpdateProviderDto input);
    }
}

using System;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HealthAPP.Services.PersonService.Dto;

namespace HealthAPP.Services.PersonService
{
   public interface IPersonAppService : IAsyncCrudAppService<PersonResponseDto, Guid, PagedAndSortedResultRequestDto, PersonRequestDto, PersonResponseDto>
    {
        
    }
}

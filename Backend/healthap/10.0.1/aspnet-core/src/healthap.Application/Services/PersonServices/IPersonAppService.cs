using System;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices
{
    public interface IPersonAppService : IAsyncCrudAppService<PersonResponseDto, Guid, PagedAndSortedResultRequestDto, PersonRequestDto, PersonResponseDto>
    {

    }
}

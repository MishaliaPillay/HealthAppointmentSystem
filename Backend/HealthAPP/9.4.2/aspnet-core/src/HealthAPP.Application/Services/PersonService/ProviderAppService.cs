using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.PersonService.Dto;

namespace HealthAPP.Services.PersonService
{
    public class ProviderAppService :
       AsyncCrudAppService<Provider, ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>,
       IProviderAppService
    {
        private readonly ProviderManager _providerManager;
        public ProviderAppService(IRepository<Provider, Guid> repository,ProviderManager providerManager): base(repository)
        {
            _providerManager = providerManager;
        }
        public override async Task<ProviderResponseDto> CreateAsync(ProviderRequestDto input)
        {
            var provider = await _providerManager.CreateProviderAsync(
                input.FirstName,
                input.Surname,
                input.Email,
                input.PhoneNumber,
                input.UserName,
                input.Password,
                input.Title,
                input.Biography,
                input.YearsOfExperience,
                input.MaxAppointmentsPerDay,
                input.Qualification
            );
            return MapToEntityDto(provider);
        }
    }
}

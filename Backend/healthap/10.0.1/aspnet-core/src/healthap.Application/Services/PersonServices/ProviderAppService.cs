using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AutoMapper;
using healthap.Domain.Persons;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices
{
    public class ProviderAppService :
         AsyncCrudAppService<Provider, ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>,

         IProviderAppService
    {
        private readonly ProviderManager _providerManager;
        private readonly IMapper _mapper;

        public ProviderAppService(IRepository<Provider, Guid> repository, ProviderManager providerManager ,IMapper mapper) : base(repository)
        {
            _providerManager = providerManager;
            _mapper = mapper;

        }
        public override async Task<ProviderResponseDto> CreateAsync(ProviderRequestDto input)
        {
            var provider = await _providerManager.CreateProviderAsync(
                input.Title,
                input.FirstName,
                input.Surname,
                input.Email,
                input.PhoneNumber,
                input.UserName,
                input.Password,
                input.Biography,
                input.YearsOfExperience,
                input.MaxAppointmentsPerDay,
                input.Qualification
            );
            return _mapper.Map<ProviderResponseDto>(provider);
        }
    }
}

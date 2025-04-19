using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using healthap.Domain.Persons;
using healthap.Services.PersonServices.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace healthap.Services.PersonServices
{
    public class ProviderAppService :
         AsyncCrudAppService<Provider, ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>,

         IProviderAppService
    {
        private readonly ProviderManager _providerManager;
        private readonly IMapper _mapper;

        public ProviderAppService(IRepository<Provider, Guid> repository, ProviderManager providerManager, IMapper mapper) : base(repository)
        {
            _providerManager = providerManager;
            _mapper = mapper;

        }
        public override async Task<ProviderResponseDto> CreateAsync(ProviderRequestDto input)
        {
            var provider = await _providerManager.CreateProviderAsync(
                input.Title,
    input.Name,
    input.Surname,
    input.EmailAddress,
    input.PhoneNumber,
    input.UserName,
    input.Password,
    input.Biography,
    input.YearsOfExperience,
    input.MaxAppointmentsPerDay,
    input.Qualification,
    input.Speciality,
    input.InstitutionId
            );
            return _mapper.Map<ProviderResponseDto>(provider);
        }
        public override async Task<ProviderResponseDto> GetAsync(EntityDto<Guid> input)
        {
            var proivder = await _providerManager.GetProviderByIdWithUserAsync(input.Id);
            if (proivder == null)
            {
                throw new UserFriendlyException("Paitient not found");
            }
            return _mapper.Map<ProviderResponseDto>(proivder);

        }
        public override async Task<PagedResultDto<ProviderResponseDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _providerManager.GetAllProvidersAsync();
            var totalCount = await query.CountAsync();
            //pagination:process of dividing a large set of data into smaller and more managebale chuncks 
            var providers = await query
                .Skip(input.SkipCount)//how many records to skip
                .Take(input.MaxResultCount)//the number of records that should be retrieved 
                .ToListAsync();

            return new PagedResultDto<ProviderResponseDto>(
                totalCount,
                _mapper.Map<List<ProviderResponseDto>>(providers)
            );
        }
    }
}

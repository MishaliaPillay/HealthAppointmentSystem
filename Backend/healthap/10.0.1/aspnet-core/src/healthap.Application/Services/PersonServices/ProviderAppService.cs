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
using Abp.Authorization;
using NuGet.Protocol.Core.Types;

namespace healthap.Services.PersonServices
{
    public class ProviderAppService :
         AsyncCrudAppService<Provider, ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>,

         IProviderAppService
    {
        private readonly ProviderManager _providerManager;
        private readonly IMapper _mapper;
        private readonly IRepository<Provider, Guid> _repository;

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
                input.Qualification
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
        public async Task<ProviderResponseDto> GetCurrentProviderAsync(long userId)
        {
            var provider = await _providerManager.GetProviderByUserIdAsync(userId);
            return _mapper.Map<Provider, ProviderResponseDto>(provider);
        }

        public async Task<ProviderResponseDto> UpdateproviderAsync(UpdateProviderDto input)
        {

            var provider = await _repository.GetAsync(input.Id);
            if (provider == null)
                throw new UserFriendlyException("provider not found");

            var updatedprovider = await _providerManager.UpdateproviderAsync(
                input.Id,
                input.Name,
                input.Surname,
                input.EmailAddress,
                input.PhoneNumber,
                input.UserName,
                input.Password,
                input.Title,
                input.Biography,
                input.YearsOfExperience,
                input.MaxiumAppointmentsPerDay,
                input.Qualifications,
                input.Speciality
            );

            return _mapper.Map<ProviderResponseDto>(updatedprovider);
        }

      
    }

}
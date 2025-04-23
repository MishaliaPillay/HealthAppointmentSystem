using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using healthap.Domain.Persons;
using healthap.Services.PersonServices.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace healthap.Services.PersonServices
{
    public class ProviderAppService :
         AsyncCrudAppService<Provider, ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>,
         IProviderAppService, IApplicationService
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
                input.Qualification,
                input.SpecialtyName,
                input.InstitutionId
            );
            return _mapper.Map<ProviderResponseDto>(provider);
        }

        public override async Task<ProviderResponseDto> GetAsync(EntityDto<Guid> input)
        {
            var provider = await _providerManager.GetProviderByIdWithUserAsync(input.Id);
            if (provider == null)
            {
                throw new UserFriendlyException("Provider not found");
            }
            return _mapper.Map<ProviderResponseDto>(provider);
        }

        public override async Task<PagedResultDto<ProviderResponseDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _providerManager.GetAllProvidersAsync();
            var totalCount = await query.CountAsync();

            var providers = await query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            return new PagedResultDto<ProviderResponseDto>(
                totalCount,
                _mapper.Map<List<ProviderResponseDto>>(providers)
            );
        }

        public async Task<ProviderResponseDto> GetCurrentProviderAsync(long userId)
        {
            var provider = await _providerManager.GetProviderByUserIdAsync(userId);
            var result =  _mapper.Map<ProviderResponseDto>(provider);
            return result;
        }

        public async Task<ProviderResponseDto> UpdateproviderAsync(UpdateProviderDto input)
        {
            var provider = await _repository.GetAsync(input.Id);
            if (provider == null)
                throw new UserFriendlyException("Provider not found");

            var updatedProvider = await _providerManager.UpdateProviderAsync(
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
                input.SpecialityName
            );

            return _mapper.Map<ProviderResponseDto>(updatedProvider);
        }
    }
}

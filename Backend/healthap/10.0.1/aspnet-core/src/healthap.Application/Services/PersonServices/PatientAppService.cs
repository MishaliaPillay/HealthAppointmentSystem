using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using healthap.Authorization.Users;
using healthap.Domain.Persons;
using healthap.Services.PersonServices.Dtos;
using Microsoft.EntityFrameworkCore;

namespace healthap.Services.PersonServices
{
    public class PatientAppService : AsyncCrudAppService<Patient, PatientResponseDto, Guid, PagedAndSortedResultRequestDto, PatientRequestDto, PatientResponseDto>, IPatientAppService
    {
        private readonly PatientManager _patientManager;
        private readonly IMapper _mapper;
        private readonly IRepository<Patient, Guid> _repository;

        public PatientAppService(IRepository<Patient, Guid> repository, PatientManager patientManager, IMapper mapper) : base(repository)
        {
            _patientManager = patientManager;
            _repository = repository;
            _mapper = mapper;
        }

        public override async Task<PatientResponseDto> CreateAsync(PatientRequestDto input)
        {

            var patient = await _patientManager.CreatePatientAsync(
                input.Title,
                input.Name,
                input.Surname,
                input.EmailAddress,
                input.PhoneNumber,
                input.UserName,
                input.Password,
                input.DateOfBirth,
                input.Address,
                input.City,
                input.Province,
                input.PostalCode,
                input.Country,
                input.PreferredContactMethod
            );

            return _mapper.Map<PatientResponseDto>(patient);

        }

        public override async Task<PatientResponseDto> GetAsync(EntityDto<Guid> input)
        {
            var patient = await _patientManager.GetPatientByIdWithUserAsync(input.Id);
            if (patient == null)
            {
                throw new UserFriendlyException("Paitient not found");
            }
            return _mapper.Map<PatientResponseDto>(patient);

        }
        public override async Task<PagedResultDto<PatientResponseDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _patientManager.GetAllPaitentsAsync();
            var totalCount = await query.CountAsync();
            //pagination:process of dividing a large set of data into smaller and more managebale chuncks 
            var patients = await query
                .Skip(input.SkipCount)//how many records to skip
                .Take(input.MaxResultCount)//the number of records that should be retrieved 
                .ToListAsync();

            return new PagedResultDto<PatientResponseDto>(
                totalCount,
                _mapper.Map<List<PatientResponseDto>>(patients)
            );
        }
                public async Task<PatientResponseDto> GetCurrentPatientAsync(long id)
        {

            // Check if user is logged in
            //var currentUserId = AbpSession.UserId;
            //if (!currentUserId.HasValue)
            //{
            //    throw new AbpAuthorizationException("You must be logged in to access patient information.");
            //}
            var queryPatient = await _repository.GetAllIncludingAsync(p => p.User, p => p.Appointments);

 
            // Get the provider by the input user ID
            var patient = await queryPatient.FirstOrDefaultAsync(p => p.UserId == id);
            // Check if patient exists
            if (patient == null)
            {
                throw new UserFriendlyException("Patient not found");
            }

            // Map to DTO and return
            return _mapper.Map<Patient, PatientResponseDto>(patient);
        }
    }
}

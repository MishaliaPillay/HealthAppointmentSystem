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
    public class PatientAppService : AsyncCrudAppService<Patient, PatientResponseDto, Guid, PagedAndSortedResultRequestDto, PatientRequestDto, PatientResponseDto>, IPatientAppService
    {
        private readonly PatientManager _patientManager;
        private readonly IMapper _mapper;

        public PatientAppService(IRepository<Patient, Guid> repository, PatientManager patientManager,IMapper mapper) : base(repository)
        {
            _patientManager = patientManager;
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

    }
}

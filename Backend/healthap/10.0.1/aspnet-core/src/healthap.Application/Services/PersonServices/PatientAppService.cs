using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using healthap.Domain.Persons;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices
{
    public class PatientAppService : AsyncCrudAppService<Patient, PatientResponseDto, Guid, PagedAndSortedResultRequestDto, PatientRequestDto, PatientResponseDto>, IPatientAppService
    {
        private readonly PatientManager _patientManager;

        public PatientAppService(IRepository<Patient, Guid> repository, PatientManager patientManager) : base(repository)
        {
            _patientManager = patientManager;
        }

        public override async Task<PatientResponseDto> CreateAsync(PatientRequestDto input)
        {

            var patient = await _patientManager.CreatePatientAsync(
                input.Title,
                input.FirstName,
                input.Surname,
                input.Email,
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

            return MapToEntityDto(patient);

        }

    }
}

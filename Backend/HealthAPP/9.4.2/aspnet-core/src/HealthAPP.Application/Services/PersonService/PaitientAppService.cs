using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using AutoMapper.Internal.Mappers;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.PersonService.Dto;

namespace HealthAPP.Services.PersonService
{
   public class PatientAppService : ApplicationService
{
    private readonly PaitientManager _patientManager;
    public PatientAppService(PaitientManager patientManager)
    {
        _patientManager = patientManager;
    }
    public async Task<PatientResponseDto> RegisterPatientAsync(PatientRequestDto input)
    {
        var patient = await _patientManager.CreatePatientAsync(
            input.FirstName,
            input.Surname,
            input.Email,
            input.PhoneNumber,
            input.UserName,
            input.Password,
            "Patient", // Fixed role for patients
            input.DateOfBirth,
            input.Address,
            input.City,
            input.Province,
            input.PostalCode,
            input.Country,
            input.PreferredContactMethod
        );
        return ObjectMapper.Map<PatientResponseDto>(patient);
    }
}
// Application service for registering providers
public class ProviderAppService : ApplicationService, IProviderAppService
{
    private readonly ProviderManager _providerManager;
    public ProviderAppService(ProviderManager providerManager)
    {
        _providerManager = providerManager;
    }
    public async Task<ProviderDto> RegisterProviderAsync(CreateProviderDto input)
    {
        var provider = await _providerManager.CreateProviderAsync(
            input.FirstName,
            input.Surname,
            input.Email,
            input.PhoneNumber,
            input.UserName,
            input.Password,
            "Provider", // Fixed role for providers
            input.Title,
            input.Biography,
            input.YearsOfExperience,
            input.MaxAppointmentsPerDay,
            input.Qualification
        );
        return ObjectMapper.Map<ProviderDto>(provider);
    }
}
}

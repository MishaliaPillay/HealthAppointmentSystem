using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Castle.Core.Logging;
using HealthAPP.Authorization.Users;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.PatientServices.PatientDto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace HealthAPP.Services.PatientServices
{
    public class PatientAppService : ApplicationService, IPatientService
    {

        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly UserManager _userManager;
        public ILogger Logger { get; set; }

        public PatientAppService(
        IRepository<Patient, Guid> patientRepository,
        UserManager userManager)
        {
            
            _patientRepository = patientRepository;
         
            _userManager = userManager;

            Logger = NullLogger.Instance;
        }

public async Task<PatientDto.PatientDto> CreatePatientAsync(CreatePatientDto input)
{
    var user = new User
    {
        UserName = input.Email,
        Name = input.FirstName,
        Surname = input.LastName,
        EmailAddress = input.Email,
        PhoneNumber = input.PhoneNumber,
        IsActive = true
    };
    
    // This stores the password securely in ABP's User table
    var result = await _userManager.CreateAsync(user, input.Password);
    if (!result.Succeeded)
    {
        throw new UserFriendlyException("User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));
    }
    
    await _userManager.AddToRoleAsync(user, "Patient");
    
    var patient = ObjectMapper.Map<Patient>(input);
    patient.User = user;  // Link to the ABP User
    patient.Role = "Patient";  // Set your domain role
    
    await _patientRepository.InsertAsync(patient);
    await CurrentUnitOfWork.SaveChangesAsync();
    
    return ObjectMapper.Map<PatientDto.PatientDto>(patient);
}

        public async Task DeletePatientAsync(Guid id)
        {
            // Get patient with user information
            var patient = await _patientRepository
                .GetAll()
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (patient == null)
            {
                throw new UserFriendlyException("Patient not found");
            }

            // Store User reference if exists
            var user = patient.User;

            await _patientRepository.DeleteAsync(id);

            if (user != null)
            {
                await _userManager.DeleteAsync(user);
            }

            await CurrentUnitOfWork.SaveChangesAsync();
        }


        //    public async Task<PagedResultDto<PatientDto.PatientDto>> GetAllPatientsAsync(GetPatientsInput input)
        //    {
        //        Logger.Debug("Starting GetAllPatientsAsync with input: {@Input}", input);

        //        var allowedSortFields = new List<string>
        //{
        //    nameof(Patient.FirstName),
        //    nameof(Patient.LastName),
        //    nameof(Patient.Email),
        //    nameof(Patient.PhoneNumber),
        //    nameof(Patient.Address),
        //    nameof(Patient.City),
        //    nameof(Patient.CreationTime)
        //};

        //        var query = _patientRepository.GetAll();

        //        // Fixed filtering (case-insensitive without ILike)
        //        if (!string.IsNullOrWhiteSpace(input.Filter))
        //        {
        //            var filter = input.Filter.ToLower();
        //            query = query.Where(p =>
        //                p.FirstName.ToLower().Contains(filter) ||
        //                p.LastName.ToLower().Contains(filter) ||
        //                p.Email.ToLower().Contains(filter) ||
        //                p.PhoneNumber.Contains(filter) ||
        //                p.Address.ToLower().Contains(filter) ||
        //                p.City.ToLower().Contains(filter)
        //            );
        //        }

        //        // Fixed sorting with dynamic LINQ
        //        if (!string.IsNullOrWhiteSpace(input.Sorting) && IsSortingValid(input.Sorting, allowedSortFields))
        //        {
        //            query = query.OrderBy(input.Sorting);
        //        }
        //        else
        //        {
        //            query = query.OrderBy(p => p.LastName).ThenBy(p => p.FirstName);
        //        }

        //        var totalCount = await query.CountAsync();

        //        var patients = await query
        //            .Skip(input.SkipCount)
        //            .Take(input.MaxResultCount)
        //            .ToListAsync();

        //        Logger.Debug("Retrieved {Count} patients", patients.Counts);

        //        var patientDtos = ObjectMapper.Map<List<PatientDto.PatientDto>>(patients);

        //        return new PagedResultDto<PatientDto.PatientDto>
        //        {
        //            TotalCount = totalCount,
        //            Items = patientDtos
        //        };
        //    }

        //    private bool IsSortingValid(string sortingExpression, List<string> allowedFields)
        //    {
        //        if (string.IsNullOrWhiteSpace(sortingExpression)) return false;

        //        var field = sortingExpression.Split(' ')[0];
        //        return allowedFields.Contains(field, StringComparer.OrdinalIgnoreCase);
        //    }

        //    // Helper method to validate sorting field
        //    private bool IsSortingValid(string sortingExpression, List<string> allowedFields)
        //    {
        //        if (string.IsNullOrWhiteSpace(sortingExpression)) return false;

        //        var field = sortingExpression.Split(' ')[0]; // Extract field name
        //        return allowedFields.Contains(field, StringComparer.OrdinalIgnoreCase);
        //    }

        public async Task<PatientDto.PatientDto> GetPatientAsync(Guid id)
        {
            // Get patient with related user information
            var patient = await _patientRepository
                .GetAll()
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (patient == null)
            {
                throw new UserFriendlyException("Patient not found");
            }

            return ObjectMapper.Map<PatientDto.PatientDto>(patient);
        }

        public async Task<PatientDto.PatientDto> UpdatePatientAsync(UpdatePatientDto input)
        {
            // Retrieve patient with included User
            var patient = await _patientRepository.GetAll()
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == input.Id);

            if (patient == null)
            {
                throw new UserFriendlyException("Patient not found.");
            }

            // Map input to patient entity
            ObjectMapper.Map(input, patient);

            // Update associated user details
            var user = patient.User;
            if (user == null)
            {
                throw new UserFriendlyException("Associated user not found for the patient.");
            }

            user.Name = input.FirstName;
            user.Surname = input.LastName;
            user.EmailAddress = input.Email;
            user.UserName = input.Email; // Ensure UserName is synced with Email
            user.PhoneNumber = input.PhoneNumber;

            // Update user and handle possible errors (e.g., duplicate email)
            var userUpdateResult = await _userManager.UpdateAsync(user);
            if (!userUpdateResult.Succeeded)
            {
                throw new UserFriendlyException("User update failed: " +
                    string.Join(", ", userUpdateResult.Errors.Select(e => e.Description)));
            }

            // Update patient and save changes
            await _patientRepository.UpdateAsync(patient);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<PatientDto.PatientDto>(patient);
        }
    }
}

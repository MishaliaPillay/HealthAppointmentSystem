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
using HealthAPP.Authorization.Roles;

namespace HealthAPP.Services.PatientServices
{
    public class PatientAppService : ApplicationService, IPatientService
    {
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        public ILogger Logger { get; set; }

        public PatientAppService(
            IRepository<Patient, Guid> patientRepository,
            UserManager userManager,
            RoleManager roleManager)
        {
            _patientRepository = patientRepository;
            _userManager = userManager;
            _roleManager = roleManager;
            Logger = NullLogger.Instance;
        }

        public async Task<PatientDto.PatientDto> CreatePatientAsync(CreatePatientDto input)
        {
            try
            {
                // Check if the Patient role exists
                var patientRole = await _roleManager.FindByNameAsync("Patient");
                if (patientRole == null)
                {
                    throw new UserFriendlyException("Patient role does not exist. Please create it first.");
                }

                var user = new User
                {
                    UserName = input.Email,
                    Name = input.FirstName,
                    Surname = input.LastName,
                    EmailAddress = input.Email,
                    PhoneNumber = input.PhoneNumber,
                    IsActive = true
                };

                // Create the ABP user
                var result = await _userManager.CreateAsync(user, input.Password);
                if (!result.Succeeded)
                {
                    throw new UserFriendlyException("User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));
                }

                // Add to Patient role
                var roleResult = await _userManager.AddToRoleAsync(user, "Patient");
                if (!roleResult.Succeeded)
                {
                    throw new UserFriendlyException("Failed to assign Patient role: " + string.Join(", ", roleResult.Errors.Select(e => e.Description)));
                }

                // Create and map the patient
                var patient = ObjectMapper.Map<Patient>(input);
                patient.User = user;  // Link to the ABP User
                patient.Role = "Patient";  // Set your domain role

                await _patientRepository.InsertAsync(patient);
                await CurrentUnitOfWork.SaveChangesAsync();

                return ObjectMapper.Map<PatientDto.PatientDto>(patient);
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating patient", ex);
                throw new UserFriendlyException("An error occurred while creating the patient: " + ex.Message);
            }
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


        public async Task<PagedResultDto<PatientDto.PatientDto>> GetAllPatientsAsync(GetPatientsInput input)
        {
            // Simple query to get all patients
            var query = _patientRepository.GetAll();

            // Get total count for pagination
            var totalCount = await query.CountAsync();

            // Apply basic ordering by name
            query = query.OrderBy(p => p.LastName).ThenBy(p => p.FirstName);

            // Apply paging
            var patients = await query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            // Map to DTOs
            var patientDtos = ObjectMapper.Map<List<PatientDto.PatientDto>>(patients);

            // Return result
            return new PagedResultDto<PatientDto.PatientDto>
            {
                TotalCount = totalCount,
                Items = patientDtos
            };
        }

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

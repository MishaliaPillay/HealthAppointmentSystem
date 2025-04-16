using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;
using Microsoft.EntityFrameworkCore;

namespace healthap.Domain.Persons
{
    public class PatientManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Patient, Guid> _patientRepository;

        public PatientManager(
            UserManager userManager,
            IRepository<Patient, Guid> patientRepository)
        {
            _userManager = userManager;
            _patientRepository = patientRepository;
        }

        public async Task<Patient> CreatePatientAsync(
            string title,
            string firstName,
            string surname,
            string emailAddress,
            string phoneNumber,
            string username,
            string password,
            DateTime dateOfBirth,
            string address,
            string city,
            string province,
            string postalCode,
            string country,
            ReflistConMethod preferredContactMethod)
        {
            try
            {
                var user = new User
                {
                    UserName = username,
                    Name = firstName,
                    Surname = surname,
                    EmailAddress = emailAddress,
                    PhoneNumber = phoneNumber,
                    IsActive = true
                };

                var result = await _userManager.CreateAsync(user, password);
                if (!result.Succeeded)
                {
                    throw new UserFriendlyException("Failed to create user: " + string.Join(", ", result.Errors));
                }

                // Add to Patient role
                await _userManager.AddToRoleAsync(user, "PATIENT");


                var patient = new Patient
                {
                    UserId = Convert.ToInt64(user.Id),
                    Title = title,
                    PhoneNumber = phoneNumber,
                    DateOfBirth = dateOfBirth,
                    Address = address,
                    City = city,
                    Province = province,
                    PostalCode = postalCode,
                    Country = country,
                    PreferredContactMedthod = preferredContactMethod,
                    Appointments = new List<Appointment>()
                };

                await _patientRepository.InsertAsync(patient);

                return patient;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error creating patient: {ex.Message}", ex);
                if (ex.InnerException != null)
                    Logger.Error($"Logger Inner exception: {ex.InnerException.Message}");
                throw new UserFriendlyException("An error occurred while creating the patient. See logs for details.", ex);
            }
        }

        public async Task<Patient> GetPatientByIdWithUserAsync(Guid id)
        {
            //returning an IQuerable that all/mutiple patients  with their users information and appointments nested  
            var query = await _patientRepository.GetAllIncludingAsync(p => p.User, p => p.Appointments);
            //returning only one patient with that id
            return await query.FirstOrDefaultAsync(p => p.Id == id);

        }
        public IQueryable<Patient> GetAllPaitentsAsync()
        {
            return _patientRepository.GetAllIncluding(p => p.User);
        }

        public async Task<Patient?> GetPatientByUserIdWithDetailsAsync(long userId)
        {
            var queryPatient = await _patientRepository.GetAllIncludingAsync(p => p.User, p => p.Appointments);

                return await queryPatient.FirstOrDefaultAsync(p => p.UserId == userId);
        }
    }
}


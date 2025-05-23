﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;

namespace healthap.Domain.Persons
{
    public class PatientManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly IRepository<Patient, Guid> _repository;

        public PatientManager(
            UserManager userManager,
            IRepository<Patient, Guid> patientRepository,
            IRepository<Patient, Guid> repository)
        {
            _userManager = userManager;
            _patientRepository = patientRepository;
            _repository = repository;
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

        public async Task<Patient> GetPatientByUserIdAsync(long userId)
        {
            var patients = await _repository.GetAllIncludingAsync(
                p => p.User,
                p => p.Appointments
            );

            var patient = await patients.FirstOrDefaultAsync(p => p.UserId == userId);
            if (patient == null)
            {
                throw new UserFriendlyException("Patient not found");
            }

            return patient;
        }

        public async Task<Patient?> GetPatientByUserIdWithDetailsAsync(long? userId)
        {
            var queryPatient = await _patientRepository.GetAllIncludingAsync(p => p.User, p => p.Appointments);

            return await queryPatient.FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<Patient> UpdatePatientAsync(
          Guid patientId,
          string? Name,
          string? surname,
          string? emailAddress,
          string? phoneNumber,
          string? userName,
          string? password,
          string? title,
          string? address,
          string? city,
          string? province,
          string? postalCode,
          string? country,
      ReflistConMethod? preferredContactMethod)
        {
            var patient = await _patientRepository.GetAsync(patientId);
            if (patient == null)
                throw new UserFriendlyException("Patient not found");

            var user = await _userManager.GetUserByIdAsync(patient.UserId);
            if (user == null)
                throw new UserFriendlyException("User not found");

            // Only update fields that are provided (not null)
            if (!string.IsNullOrEmpty(Name)) user.Name = Name;
            if (!string.IsNullOrEmpty(surname)) user.Surname = surname;
            if (!string.IsNullOrEmpty(emailAddress)) user.EmailAddress = emailAddress;
            if (!string.IsNullOrEmpty(userName)) user.UserName = userName;
            if (!string.IsNullOrEmpty(title)) patient.Title = title;
            if (!string.IsNullOrEmpty(phoneNumber)) patient.PhoneNumber = phoneNumber;
            if (!string.IsNullOrEmpty(address)) patient.Address = address;
            if (!string.IsNullOrEmpty(city)) patient.City = city;
            if (!string.IsNullOrEmpty(province)) patient.Province = province;
            if (!string.IsNullOrEmpty(postalCode)) patient.PostalCode = postalCode;
            if (!string.IsNullOrEmpty(country)) patient.Country = country;

            if (!string.IsNullOrEmpty(password))
            {
                var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                var passwordResult = await _userManager.ResetPasswordAsync(user, passwordResetToken, password);
                if (!passwordResult.Succeeded)
                    throw new UserFriendlyException("Failed to update password: " + string.Join(", ", passwordResult.Errors));
            }

            if (preferredContactMethod.HasValue)
                patient.PreferredContactMedthod = preferredContactMethod.Value;

            await _patientRepository.UpdateAsync(patient);
            await _userManager.UpdateAsync(user);

            return patient;
        }
    }
}


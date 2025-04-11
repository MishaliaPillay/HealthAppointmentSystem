using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using healthap.Domain.Appointments;

namespace healthap.Domain.Persons
{
    public class PatientManager : DomainService
    {
        private readonly PersonManager _personManager;
        private readonly IRepository<Patient, Guid> _patientRepository;
        public PatientManager(PersonManager personManager, IRepository<Patient, Guid> patientRepository)
        {
            _personManager = personManager;
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
            int country,
            ReflistConMethod preferredContactMethod)
        {
            try
            {
                var patient = new Patient
                {
                    Title = title,
                    FirstName = firstName,
                    Surname = surname,
                    Email = emailAddress,
                    PhoneNumber = phoneNumber,
                    UserName = username,
                    Role = "Patient",
                    DateOfBirth = dateOfBirth,
                    Address = address,
                    City = city,
                    Province = province,
                    PostalCode = postalCode,
                    Country = country,
                    PreferredContactMedthod = preferredContactMethod,
                    Appointments = new List<Appointment>()
                };
                // creating Person and User entities
                await _personManager.CreatePersonAsync(patient, password);
                // Return the created Patient
                return patient;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating patient", ex);
                throw new UserFriendlyException("An error occurred while creating the patient", ex);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;

namespace healthap.Domain.Persons
{
    public class ProviderManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Provider, Guid> _providerRepository;

        public ProviderManager(
            UserManager userManager,
            IRepository<Provider, Guid> providerRepository)
        {
            _userManager = userManager;
            _providerRepository = providerRepository;
        }

        public async Task<Provider> CreateProviderAsync(
            string title,
            string firstName,
            string surname,
            string emailAddress,
            string phoneNumber,
            string username,
            string password,
            string biography,
            int yearsOfExperience,
            int maxAppointmentsPerDay,
            string qualification)
        {
            try
            {

                // Create provider user entity
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

                // Add Provider role
                await _userManager.AddToRoleAsync(user, "Provider");

                // Create provider entity
                var provider = new Provider
                {
                    UserId = user.Id,
                    Title = title,
                    Biography = biography,
                    PhoneNumber = phoneNumber,
                    YearsOfExperience = yearsOfExperience,
                    MaxAppointmentsPerDay = maxAppointmentsPerDay,
                    Qualification = qualification,
                    Availabilities = new List<ProviderAvailabilty>(),
                    Appointments = new List<Appointment>()
                };

                await _providerRepository.InsertAsync(provider);

                return provider;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error creating provider: {ex.Message}", ex);
                if (ex.InnerException != null)
                    Logger.Error($"Inner exception: {ex.InnerException.Message}");
                throw new UserFriendlyException("An error occurred while creating the provider", ex);
            }
        }
    }


    }

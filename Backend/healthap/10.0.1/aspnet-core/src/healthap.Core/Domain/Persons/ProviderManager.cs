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
    public class ProviderManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Provider, Guid> _providerRepository;
        private readonly IRepository<Provider, Guid> _repository;

        public ProviderManager(
            UserManager userManager,
            IRepository<Provider, Guid> providerRepository,
            IRepository<Provider, Guid> repository)
        {
            _userManager = userManager;
            _providerRepository = providerRepository;
            _repository = repository;
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
            string qualification,
            string specialityName,
            int institutionId)
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
                await _userManager.AddToRoleAsync(user, "PROVIDER");

                // Create provider entity
                var provider = new Provider
                {
                    UserId = Convert.ToInt64(user.Id),
                    Title = title,
                    Biography = biography,
                    PhoneNumber = phoneNumber,
                    YearsOfExperience = yearsOfExperience,
                    MaxAppointmentsPerDay = maxAppointmentsPerDay,
                    Qualification = qualification,
                    SpecialityName = specialityName,
                    InstitutionId = institutionId,
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

        public async Task<Provider> GetProviderByIdWithUserAsync(Guid id)
        {
            //returning an IQueryable that includes providers with their users information and appointments nested  
            var query = await _providerRepository.GetAllIncludingAsync(p => p.User, p => p.Appointments);
            //returning only one provider with that id
            return await query.FirstOrDefaultAsync(p => p.Id == id);
        }

        public IQueryable<Provider> GetAllProvidersAsync()
        {
            return _providerRepository.GetAllIncluding(p => p.User);
        }

        public async Task<Provider?> GetProviderByUserIdWithDetailsAsync(long userId)
        {
            var queryProvider = await _providerRepository.GetAllIncludingAsync(p => p.User, p => p.Appointments, p => p.Availabilities);
            return await queryProvider.FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<Provider> UpdateProviderAsync(
          Guid providerId,
          string? Name,
          string? surname,
          string? emailAddress,
          string? userName,
          string? password,
          string? title,
          string? phoneNumber,
          string? biography,
          int? yearsOfExperienece,
          int? maxiumAppointmentsPerDay,
          string? qaulifcations,
          string? speciality)
        {
            var provider = await _providerRepository.GetAsync(providerId);
            if (provider == null)
                throw new UserFriendlyException("provider not found");

            var user = await _userManager.GetUserByIdAsync(provider.UserId);
            if (user == null)
                throw new UserFriendlyException("User not found");

            // Only update fields that are provided (not null)
            if (!string.IsNullOrEmpty(Name)) user.Name = Name;
            if (!string.IsNullOrEmpty(surname)) user.Surname = surname;
            if (!string.IsNullOrEmpty(emailAddress)) user.EmailAddress = emailAddress;
            if (!string.IsNullOrEmpty(userName)) user.UserName = userName;
            if (!string.IsNullOrEmpty(title)) provider.Title = title;
            if (!string.IsNullOrEmpty(phoneNumber)) provider.PhoneNumber = phoneNumber;
            if (!string.IsNullOrEmpty(biography)) provider.Biography = biography;
            if (yearsOfExperienece.HasValue) provider.YearsOfExperience = yearsOfExperienece.Value;
            if (maxiumAppointmentsPerDay.HasValue) provider.MaxAppointmentsPerDay = maxiumAppointmentsPerDay.Value;
            if (!string.IsNullOrEmpty(qaulifcations)) provider.Qualification = qaulifcations;
            if (!string.IsNullOrEmpty(speciality)) provider.SpecialityName = speciality;

            if (!string.IsNullOrEmpty(password))
            {
                var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                var passwordResult = await _userManager.ResetPasswordAsync(user, passwordResetToken, password);
                if (!passwordResult.Succeeded)
                    throw new UserFriendlyException("Failed to update password: " + string.Join(", ", passwordResult.Errors));
            }

            await _providerRepository.UpdateAsync(provider);
            await _userManager.UpdateAsync(user);

            return provider;
        }

        public async Task<Provider> GetProviderByUserIdAsync(long userId)
        {
            var providers = await _repository.GetAllIncludingAsync(
                p => p.User,
                p => p.Appointments,
                p => p.Availabilities
            );

            var provider = await providers.FirstOrDefaultAsync(p => p.UserId == userId);
            if (provider == null)
            {
                throw new UserFriendlyException("Provider not found");
            }

            return provider;
        }


    }
}

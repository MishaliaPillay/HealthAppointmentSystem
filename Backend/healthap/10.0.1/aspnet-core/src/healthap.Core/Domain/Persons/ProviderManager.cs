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
            string qualification,
            string speciality,
            int institutionId
)
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
                //await _userManager.AddToRoleAsync(user, "PROVIDER");

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
                    Speciality = speciality,
                    InstitutionId = institutionId,
                    ProviderAvailabilty = new List<ProviderAvailabilty>(),
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
            //returning an IQuerable that all/mutiple patients  with their users information and appointments nested  
            var query = await _providerRepository.GetAllIncludingAsync(p => p.User, p => p.Appointments);
            //returning only one patient with that id
            return await query.FirstOrDefaultAsync(p => p.Id == id);

        }

        public IQueryable<Provider> GetAllProvidersAsync()
        {
            return _providerRepository.GetAllIncluding(p => p.User);
        }

        public async Task<Provider?> GetProviderByUserIdWithDetailsAsync(long userId)
        {
            var queryProvider = await _providerRepository.GetAllIncludingAsync(p => p.User, p => p.Appointments, p => p.ProviderAvailabilty);
            return await queryProvider.FirstOrDefaultAsync(p => p.UserId == userId);
        }

    }


}

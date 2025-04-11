using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Castle.Core.Logging;
using HealthAPP.Authorization.Users;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.ProviderServices.ProviderDto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HealthAPP.Authorization.Roles;

namespace HealthAPP.Services.ProviderServices
{
    public class ProviderAppService : ApplicationService, IProviderAppService
    {
        private readonly IRepository<Provider, Guid> _providerRepository;
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        public ILogger Logger { get; set; }

        public ProviderAppService(
            IRepository<Provider, Guid> providerRepository,
            UserManager userManager,
            RoleManager roleManager)
        {
            _providerRepository = providerRepository;
            _userManager = userManager;
            _roleManager = roleManager;
            Logger = NullLogger.Instance;
        }

        public async Task<ProvidersDto> CreateProviderAsync(CreateProviderDto input)
        {
            try
            {
                // Check if the Provider role exists
                var providerRole = await _roleManager.FindByNameAsync("Provider");
                if (providerRole == null)
                {
                    throw new UserFriendlyException("Provider role does not exist. Please create it first.");
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

                // Add to Provider role
                var roleResult = await _userManager.AddToRoleAsync(user, "Provider");
                if (!roleResult.Succeeded)
                {
                    throw new UserFriendlyException("Failed to assign Provider role: " + string.Join(", ", roleResult.Errors.Select(e => e.Description)));
                }

                // Create and map the provider
                var provider = ObjectMapper.Map<Provider>(input);
                provider.User = user;  // Link to the ABP User
                provider.Role = "Provider";  // Set your domain role

                await _providerRepository.InsertAsync(provider);
                await CurrentUnitOfWork.SaveChangesAsync();

                return ObjectMapper.Map<ProvidersDto>(provider);
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating provider", ex);
                throw new UserFriendlyException("An error occurred while creating the provider: " + ex.Message);
            }
        }

        public async Task DeleteProviderAsync(Guid id)
        {
            var provider = await _providerRepository
                .GetAll()
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (provider == null)
            {
                throw new UserFriendlyException("Provider not found");
            }

            var user = provider.User;
            await _providerRepository.DeleteAsync(id);

            if (user != null)
            {
                await _userManager.DeleteAsync(user);
            }

            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task<PagedResultDto<ProvidersDto>> GetAllProvidersAsync(GetProvidersInput input)
        {
            var query = _providerRepository.GetAll();

            var totalCount = await query.CountAsync();

            query = query.OrderBy(p => p.LastName).ThenBy(p => p.FirstName);

            var providers = await query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            var providerDtos = ObjectMapper.Map<List<ProvidersDto>>(providers);

            return new PagedResultDto<ProvidersDto>
            {
                TotalCount = totalCount,
                Items = providerDtos
            };
        }

        public async Task<ProvidersDto> GetProviderAsync(Guid id)
        {
            var provider = await _providerRepository
                .GetAll()
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (provider == null)
            {
                throw new UserFriendlyException("Provider not found");
            }

            return ObjectMapper.Map<ProvidersDto>(provider);
        }

        public async Task<ProvidersDto> UpdateProviderAsync(UpdateProviderDto input)
        {
            var provider = await _providerRepository.GetAll()
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == input.Id);

            if (provider == null)
            {
                throw new UserFriendlyException("Provider not found.");
            }

            ObjectMapper.Map(input, provider);

            var user = provider.User;
            if (user == null)
            {
                throw new UserFriendlyException("Associated user not found for the provider.");
            }

            user.Name = input.FirstName;
            user.Surname = input.LastName;
            user.EmailAddress = input.Email;
            user.UserName = input.Email;
            user.PhoneNumber = input.PhoneNumber;

            var userUpdateResult = await _userManager.UpdateAsync(user);
            if (!userUpdateResult.Succeeded)
            {
                throw new UserFriendlyException("User update failed: " +
                    string.Join(", ", userUpdateResult.Errors.Select(e => e.Description)));
            }

            await _providerRepository.UpdateAsync(provider);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<ProvidersDto>(provider);
        }
    }
}

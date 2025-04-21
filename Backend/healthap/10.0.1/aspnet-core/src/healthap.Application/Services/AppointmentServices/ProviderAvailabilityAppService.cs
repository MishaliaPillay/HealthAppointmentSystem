using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.UI;
using healthap.Domain.Appointments;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.AppointmentServices
{
    public class ProviderAvailabilityAppService : ApplicationService, IProviderAvailabilityAppService
    {
        private readonly AvailabilityManager _availabilityManager;

        public ProviderAvailabilityAppService(AvailabilityManager availabilityManager)
        {
            _availabilityManager = availabilityManager;
        }

        public async Task<List<ProviderAvailabiltyDto>> GetAvailabilityByProviderIdAsync(Guid providerId)
        {
            var availabilities = await _availabilityManager.GetAvailabilityByProviderIdAsync(providerId);
            return ObjectMapper.Map<List<ProviderAvailabiltyDto>>(availabilities);
        }

        public async Task<ProviderAvailabiltyDto> CreateAvailabilityAsync(ProviderAvailabiltyDto input)
        {
            try
            {
                var createdAvailability = await _availabilityManager.CreateAvailabilityIfNotExistsAsync(
                    input.ProviderId,
                    input.DateAvailable,
                    input.DayOfWeek,
                    input.StartTime,
                    input.EndTime,
                    input.IsAvailable
                );

                return ObjectMapper.Map<ProviderAvailabiltyDto>(createdAvailability);
            }
            catch (UserFriendlyException ex)
            {
                throw new UserFriendlyException(ex.Message);
            }
        }

        public async Task<ProviderAvailabiltyDto> UpdateAvailabilityAsync(ProviderAvailabiltyDto input)
        {
            try
            {
                var updatedAvailability = await _availabilityManager.UpdateAvailabilityAsync(
                    input.Id,
                    input.DayOfWeek,
                    input.DateAvailable,
                    input.StartTime,
                    input.EndTime,
                    input.IsAvailable
                );

                return ObjectMapper.Map<ProviderAvailabiltyDto>(updatedAvailability);
            }
            catch (UserFriendlyException ex)
            {
                throw new UserFriendlyException(ex.Message);
            }
        }
    }
}

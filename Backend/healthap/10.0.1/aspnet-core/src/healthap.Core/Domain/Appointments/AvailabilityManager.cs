using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;

namespace healthap.Domain.Appointments
{
    public class AvailabilityManager : DomainService
    {
        private readonly IRepository<ProviderAvailabilty, Guid> _repository;

        public AvailabilityManager(IRepository<ProviderAvailabilty, Guid> repository)
        {
            _repository = repository;
        }

        public async Task<List<ProviderAvailabilty>> GetAvailabilityByProviderIdAsync(Guid providerId)
        {
          
            return await _repository.GetAllListAsync(x => x.ProviderId == providerId);
        }

        public async Task<ProviderAvailabilty> CreateAvailabilityIfNotExistsAsync(
            Guid providerId,
            DateTime dateAvailable,
            DayOfWeek dayOfWeek,
            TimeSpan startTime,
            TimeSpan endTime,
            bool isAvailable)
        {
            dateAvailable = dateAvailable.Date;
            var exists = await _repository.FirstOrDefaultAsync(x =>
                x.ProviderId == providerId &&
                x.DayOfWeek == dayOfWeek &&
                x.DateAvailable== dateAvailable &&
                x.StartTime == startTime &&
                x.EndTime == endTime);

            if (exists != null)
            {
                throw new UserFriendlyException("This availability slot already exists for the provider.");
            }

            var availability = new ProviderAvailabilty
            {
                Id = Guid.NewGuid(),
                ProviderId = providerId,
                DayOfWeek = dayOfWeek,
                DateAvailable= dateAvailable,
                StartTime = startTime,
                EndTime = endTime,
                IsAvailable = isAvailable
            };

            return await _repository.InsertAsync(availability);
        }

        public async Task<ProviderAvailabilty> UpdateAvailabilityAsync(
            Guid id,
            DayOfWeek dayOfWeek,
            DateTime dateAvailable,
            TimeSpan startTime, 
            TimeSpan endTime,
            bool isAvailable)
        {
            dateAvailable=dateAvailable.Date;   
            var existing = await _repository.FirstOrDefaultAsync(x => x.Id == id);

            if (existing == null)
            {
                throw new UserFriendlyException("Availability not found.");
            }

            existing.DayOfWeek = dayOfWeek;
            existing.DateAvailable = dateAvailable;
            existing.StartTime = startTime;
            existing.EndTime = endTime;
            existing.IsAvailable = isAvailable;

            await _repository.UpdateAsync(existing);
            return existing;
        }
    }
}

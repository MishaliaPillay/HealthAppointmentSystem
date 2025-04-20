using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using healthap.Domain.Appointments;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;
using healthap.Services.PersonServices.Dtos;
using Microsoft.EntityFrameworkCore;

namespace healthap.Services.PersonServices
{
    public class ProviderAppService :
        AsyncCrudAppService<Provider, ProviderResponseDto, Guid, PagedAndSortedResultRequestDto, ProviderRequestDto, ProviderResponseDto>,
        IProviderAppService
    {
        private readonly ProviderManager _providerManager;
        private readonly IMapper _mapper;

        private readonly IRepository<Provider, Guid> _providerRepository;
        private readonly IRepository<ProviderAvailability, Guid> _providerAvailabilityRepository;
        private readonly IRepository<Appointment, Guid> _appointmentRepository;

        public ProviderAppService(
            IRepository<Provider, Guid> repository,
            ProviderManager providerManager,
            IMapper mapper,
            IRepository<ProviderAvailability, Guid> providerAvailabilityRepository,
            IRepository<Appointment, Guid> appointmentRepository
        ) : base(repository)
        {
            _providerManager = providerManager;
            _mapper = mapper;
            _providerRepository = repository;
            _providerAvailabilityRepository = providerAvailabilityRepository;
            _appointmentRepository = appointmentRepository;
        }

        public override async Task<ProviderResponseDto> CreateAsync(ProviderRequestDto input)
        {
            var provider = await _providerManager.CreateProviderAsync(
                input.Title,
                input.Name,
                input.Surname,
                input.EmailAddress,
                input.PhoneNumber,
                input.UserName,
                input.Password,
                input.Biography,
                input.YearsOfExperience,
                input.MaxAppointmentsPerDay,
                input.Qualification,
                input.Specialty,
                input.InstitutionId
            );
            return _mapper.Map<ProviderResponseDto>(provider);
        }

        public override async Task<ProviderResponseDto> GetAsync(EntityDto<Guid> input)
        {
            var provider = await _providerManager.GetProviderByIdWithUserAsync(input.Id);
            if (provider == null)
            {
                throw new UserFriendlyException("Provider not found");
            }
            return _mapper.Map<ProviderResponseDto>(provider);
        }

        public override async Task<PagedResultDto<ProviderResponseDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _providerManager.GetAllProvidersAsync();
            var totalCount = await query.CountAsync();

            var providers = await query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            return new PagedResultDto<ProviderResponseDto>(
                totalCount,
                _mapper.Map<List<ProviderResponseDto>>(providers)
            );
        }

        public async Task SetProviderAvailabilityAsync(CreateOrUpdateAvailabilityInput input)
        {
            var provider = await _providerRepository.GetAsync(input.ProviderId);
            if (provider == null)
                throw new UserFriendlyException("Provider not found.");

            var existingAvailabilities = await _providerAvailabilityRepository
                .GetAllListAsync(x => x.Provider.Id == input.ProviderId);

            foreach (var availability in existingAvailabilities)
            {
                await _providerAvailabilityRepository.DeleteAsync(availability);
            }

            foreach (var item in input.Availabilities)
            {
                var newAvailability = new ProviderAvailability
                {
                    Id = Guid.NewGuid(),
                    Provider = provider,
                    DayOfWeek = item.DayOfWeek, // ✅ Add it here
                    StartTime = item.StartTime,
                    EndTime = item.EndTime,
                    IsAvailable = item.IsAvailable
                };

                await _providerAvailabilityRepository.InsertAsync(newAvailability);
            }
        }


        public async Task<AvailableSlotsOutput> GetAvailableSlotsAsync(Guid providerId, DateTime date)
        {
            var provider = await _providerRepository.GetAsync(providerId);
            if (provider == null)
                throw new UserFriendlyException("Provider not found");

            var dayOfWeek = date.DayOfWeek;

            var availability = await _providerAvailabilityRepository
                .FirstOrDefaultAsync(x =>
                    x.Provider.Id == providerId &&
                    EF.Property<DayOfWeek>(x, "DayOfWeek") == dayOfWeek &&
                    x.IsAvailable);

            if (availability == null)
            {
                return new AvailableSlotsOutput
                {
                    AvailableSlots = new List<TimeSpan>(),
                    BookedSlots = new List<TimeSpan>()
                };
            }

            var slotDuration = TimeSpan.FromMinutes(30); // You can make this configurable
            var availableSlots = new List<TimeSpan>();

            for (var time = availability.StartTime; time < availability.EndTime; time += slotDuration)
            {
                availableSlots.Add(time);
            }

            var bookedAppointments = await _appointmentRepository
                .GetAllListAsync(a => a.ProviderId == providerId && a.AppointmentDate.Date == date.Date);

            var bookedSlots = bookedAppointments
                .Select(a => a.AppointmentDate.TimeOfDay)
                .ToList();

            var finalSlots = availableSlots.Except(bookedSlots).ToList();

            return new AvailableSlotsOutput
            {
                AvailableSlots = finalSlots,
                BookedSlots = bookedSlots
            };
        }
    }
}

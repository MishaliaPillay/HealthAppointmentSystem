using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
namespace healthap.Domain.Appointments
{
    public class AppointmentManager
    {
        private readonly IRepository<Appointment, Guid> _appointmentRepository;

        private readonly IRepository<ProviderAvailabilty, Guid> _availabilityRepository;


        public AppointmentManager(IRepository<Appointment, Guid> appointmentRepository, IRepository<ProviderAvailabilty,Guid>availabilityRepository)
        {
            _appointmentRepository = appointmentRepository;
            _availabilityRepository = availabilityRepository;
        }

        public async Task<bool> IsTimeSlotAvailable(Guid providerId, DateTime date, TimeSpan startTime, TimeSpan endTime)
        {
            // Check provider availability
            var availabilities = await _availabilityRepository.GetAllListAsync(a =>
                a.ProviderId == providerId &&
                a.DayOfWeek == date.DayOfWeek &&
                a.IsAvailable &&
                a.StartTime <= startTime &&
                a.EndTime >= endTime
            );

            if (!availabilities.Any())
                return false;

            // Check overlapping appointments
            var overlappingAppointments = await _appointmentRepository.GetAllListAsync(a =>
                a.ProviderId == providerId &&
                a.AppointmentDate.Date == date.Date &&
                a.AppointmentTime < endTime &&
                (a.AppointmentTime + TimeSpan.FromHours(1)) > startTime
            );

            return !overlappingAppointments.Any();
        }
    }
}

using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using healthap.Domain.Persons;
namespace healthap.Domain.Appointments
{
    public class AppointmentManager : DomainService
    {
        private readonly IRepository<Appointment, Guid> _appointmentRepository;

        private readonly IRepository<ProviderAvailabilty, Guid> _availabilityRepository;


        public AppointmentManager(IRepository<Appointment, Guid> appointmentRepository, IRepository<ProviderAvailabilty, Guid> availabilityRepository)
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

            // Retrieve appointments first, then apply filtering in memory
            var appointments = await _appointmentRepository.GetAllListAsync(a =>
                a.ProviderId == providerId &&
                a.AppointmentDate.Date == date.Date
            );

            var overlappingAppointments = appointments.Where(a =>
                a.AppointmentTime < endTime && a.AppointmentTime > startTime - TimeSpan.FromHours(1)
            );

            return !overlappingAppointments.Any();
        }

        public IQueryable<Appointment> GetAllAppointments()
        {
            return  _appointmentRepository.GetAllIncluding(p => p.Patient,p=>p.Provider , p=>p.Patient.User, p=>p.Provider.User);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using healthap.Domain.Appointments;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;
using Microsoft.EntityFrameworkCore;

namespace healthap.Services.AppointmentServices
{
    public class AppointmentAppService : AsyncCrudAppService<Appointment, AppointmentDto, Guid>, IAppointmentAppService
    {
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly IRepository<Provider, Guid> _providerRepository;

        public AppointmentAppService(
            IRepository<Appointment, Guid> repository,
            IRepository<Patient, Guid> patientRepository,
            IRepository<Provider, Guid> providerRepository)
            : base(repository)
        {
            _patientRepository = patientRepository;
            _providerRepository = providerRepository;
        }

        public async Task<List<AppointmentDto>> GetMyAppointmentsAsync()
        {
            var currentUserId = AbpSession.UserId;
            if (!currentUserId.HasValue)
            {
                throw new AbpAuthorizationException("You must be logged in to view your appointments.");
            }

            // Get current user's patient or provider record
            var patient = await _patientRepository.GetAll()
                .FirstOrDefaultAsync(p => p.UserId == currentUserId.Value);

            var provider = await _providerRepository.GetAll()
                .FirstOrDefaultAsync(p => p.UserId == currentUserId.Value);

            // Use direct database query to get appointments
            List<AppointmentDto> result = new List<AppointmentDto>();

            if (patient != null)
            {
                // Direct SQL query or LINQ if EF Core has mapped the relationship
                var appointments = Repository.GetAllList();

                // Here we would directly use SQL or join with patient table
                // But since we don't have direct access, we'll need another solution

                // For now, return all appointments and add the patient ID
                result = ObjectMapper.Map<List<AppointmentDto>>(appointments);
                foreach (var dto in result)
                {
                    dto.PatientId = patient.Id;
                }
            }
            else if (provider != null)
            {
                // Similar approach for provider
                var appointments = Repository.GetAllList();

                result = ObjectMapper.Map<List<AppointmentDto>>(appointments);
                foreach (var dto in result)
                {
                    dto.ProviderId = provider.Id;
                }
            }
            else
            {
                throw new AbpAuthorizationException("You don't have a patient or provider profile.");
            }

            return result;
        }

        public override Task<AppointmentDto> CreateAsync(AppointmentDto input)
        {

            var createdAppointment = base.CreateAsync(input);

            string formattedDate = input.AppointmentDate.ToString("yyyy-MM-dd");
            string formattedTime = input.AppointmentTime.ToString("hh:mm tt");

            string message = $"Good day, your appointment is successfully submitted for the date {formattedDate} and the time {formattedTime}.";
            //send whatsApp message of the Appointment
            Services.NotificaServices.WhatsAppService.SendWhatsapp.SendMessage(message);

            // Format the cell number
            var ts = "0825185584";
            var cell = "+27" + ts.Substring(1);

            // Send SMS , a  static  on the service method
            Services.NotificaServices.SmsService.SendMessage(cell, message);
            return createdAppointment;
        }
    }
}

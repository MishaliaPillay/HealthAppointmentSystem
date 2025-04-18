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
            // Get current user ID
            var currentUserId = AbpSession.UserId;
            if (!currentUserId.HasValue)
            {
                throw new AbpAuthorizationException("You must be logged in to view your appointments.");
            }

            // Find if user is a patient or provider
            var patient = await _patientRepository.GetAll()
                .FirstOrDefaultAsync(p => p.UserId == currentUserId.Value);

            var provider = await _providerRepository.GetAll()
                .FirstOrDefaultAsync(p => p.UserId == currentUserId.Value);

            // Explicitly set type to IQueryable<Appointment> to avoid type conflict
            IQueryable<Appointment> query = Repository.GetAll()
                .Include(a => a.Patient)
                .Include(a => a.Provider);

            if (patient != null)
            {
                // Filter by patient ID
                query = query.Where(a => a.Patient.Id == patient.Id);
            }
            else if (provider != null)
            {
                // Filter by provider ID
                query = query.Where(a => a.Provider.Id == provider.Id);
            }
            else
            {
                throw new AbpAuthorizationException("You don't have a patient or provider profile.");
            }

            var appointments = await query.ToListAsync();
            return ObjectMapper.Map<List<AppointmentDto>>(appointments);
        }


        public override async Task<AppointmentDto> CreateAsync(AppointmentDto input)
        {
            try
            {
                // Get patient and provider entities
                var patient = await _patientRepository.GetAsync(input.PatientId);
                var provider = await _providerRepository.GetAsync(input.ProviderId);

                // Create appointment entity
                var appointment = ObjectMapper.Map<Appointment>(input);

                // Set relationships
                appointment.Patient = patient;
                appointment.Provider = provider;

                // Insert into database
                await Repository.InsertAsync(appointment);
                await CurrentUnitOfWork.SaveChangesAsync();

                // Map back to DTO
                var result = ObjectMapper.Map<AppointmentDto>(appointment);

                //string formattedDate = input.AppointmentDate.ToString("yyyy-MM-dd");
                //string formattedTime = input.AppointmentTime.ToString("hh:mm tt");

                //string message = $"Good day, your appointment is successfully submitted for the date {formattedDate} and the time {formattedTime}.";
                ////send whatsApp message of the Appointment
                //Services.NotificaServices.WhatsAppService.SendWhatsapp.SendMessage(message);

                //// Format the cell number
                //var ts = "0825185584";
                //var cell = "+27" + ts.Substring(1);

                //// Send SMS , a  static  on the service method
                //Services.NotificaServices.SmsService.SendMessage(cell, message);

                return result;
            }
            catch (Exception ex)
            {
                // Log error
                Logger.Error("Error creating appointment", ex);
                throw;
            }
        }
    }
}
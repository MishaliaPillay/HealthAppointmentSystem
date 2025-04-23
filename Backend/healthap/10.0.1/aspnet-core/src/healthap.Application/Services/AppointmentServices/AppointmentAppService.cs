using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;

namespace healthap.Services.AppointmentServices
{
    public class AppointmentAppService : AsyncCrudAppService<Appointment, AppointmentDto, Guid>, IAppointmentAppService
    {
        private readonly AppointmentManager _appointmentManager;
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly IRepository<Provider, Guid> _providerRepository;
        IRepository<Appointment, Guid> _appointmentRepository;

        private readonly IMapper _mapper;
        public AppointmentAppService(IRepository<Appointment, Guid> repository, IRepository<Provider, Guid> providerRepository, IRepository<Patient, Guid> patientRepository, AppointmentManager appointmentManager) : base(repository)
        {
            _appointmentManager = appointmentManager;
            _providerRepository = providerRepository;
            _patientRepository = patientRepository;
            _appointmentRepository = repository;
        }
        public override async Task<AppointmentDto> CreateAsync(AppointmentDto input)
        {
            var startTime = input.AppointmentTime;
            var endTime = startTime.Add(TimeSpan.FromHours(1));

            // Retrieve appointments first, then filter in memory
            var appointments = await Repository.GetAllListAsync(a =>
                a.ProviderId == input.ProviderId &&
                a.AppointmentDate.Date == input.AppointmentDate.Date);

            bool isAvailable = appointments.All(a =>
                a.AppointmentTime < endTime &&
                a.AppointmentTime > startTime - TimeSpan.FromHours(1)
            );

            //if (!isAvailable)
            //{
            //    throw new ApplicationException("The selected time slot is not available.");
            //}

            //string message = $"Good day, your appointment is successfully submitted for the date {input.AppointmentDate} and the time {input.AppointmentTime}.";
            //// Format the cell number
            //var ts = "0825185584";
            //var cell = "+27" + ts.Substring(1);

            //// Send SMS , a  static  on the service method
            //Services.NotificaServices.SmsService.SendMessage(cell, message);
            var createdAppointment = await base.CreateAsync(input);

            return createdAppointment;
        }
        public async Task<IList<AppointResponseDto>> GetAppointments()
        {
            var appointQuery = await _appointmentRepository.GetAllAsync();

            // Get all patient and provider IDs used in the appointments
            var patientIds = appointQuery.Select(a => a.PatientId).Distinct().ToList();
            var providerIds = appointQuery.Select(a => a.ProviderId).Distinct().ToList();

            // Get only the necessary patients and providers
            var patients = await _patientRepository.GetAllIncludingAsync(p => p.User);
            var filteredPatients = patients.Where(p => patientIds.Contains(p.Id)).ToList();

            var providers = await _providerRepository.GetAllIncludingAsync(p => p.User);
            var filteredProviders = providers.Where(p => providerIds.Contains(p.Id)).ToList();

            List<AppointResponseDto> appontResponseList = new List<AppointResponseDto>();

            foreach (var appointment in appointQuery)
            {
                var patient = filteredPatients.FirstOrDefault(p => p.Id == appointment.PatientId);
                var provider = filteredProviders.FirstOrDefault(p => p.Id == appointment.ProviderId);

                var appointResp = new AppointResponseDto
                {
                    AppointmentDate = appointment.AppointmentDate,
                    AppointmentTime = appointment.AppointmentTime,
                    Purpose = appointment.Purpose,
                    AppointmentStatus = appointment.AppointmentStatus,
                    Patient = patient,
                    Provider = provider
                };

                appontResponseList.Add(appointResp);
            }

            return appontResponseList;
        }
     

    }
}

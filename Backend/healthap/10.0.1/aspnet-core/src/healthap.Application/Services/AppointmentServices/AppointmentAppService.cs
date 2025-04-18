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
        public AppointmentAppService(IRepository<Appointment, Guid> repository)
    : base(repository)
        {
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

using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using healthap.Domain.Appointments;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.AppointmentServices
{
    public class AppointmentAppService : AsyncCrudAppService<Appointment, AppointmentDto, Guid>, IAppointmentAppService
    {
        private readonly AppointmentManager _appointmentManager;
        public AppointmentAppService(IRepository<Appointment, Guid> repository, AppointmentManager appointmentManager) : base(repository)
        {
            _appointmentManager = appointmentManager;
        }
        //public override Task<AppointmentDto> CreateAsync(AppointmentDto input)
        //{

        //    var createdAppointment = base.CreateAsync(input);

        //    string formattedDate = input.AppointmentDate.ToString("yyyy-MM-dd"); 
        //    string formattedTime = input.AppointmentTime.ToString("hh:mm tt");

        //    string message = $"Good day, your appointment is successfully submitted for the date {formattedDate} and the time {formattedTime}.";
        //    //send whatsApp message of the Appointment
        //    Services.NotificaServices.WhatsAppService.SendWhatsapp.SendMessage(message);

        //    // Format the cell number
        //    var ts = "0825185584";
        //    var cell = "+27" + ts.Substring(1);

        //    // Send SMS , a  static  on the service method
        //    Services.NotificaServices.SmsService.SendMessage(cell, message);
        //    return createdAppointment;
        //}
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

            if (!isAvailable)
            {
                throw new ApplicationException("The selected time slot is not available.");
            }

            var createdAppointment = await base.CreateAsync(input);

            return createdAppointment;
        }
    }
}

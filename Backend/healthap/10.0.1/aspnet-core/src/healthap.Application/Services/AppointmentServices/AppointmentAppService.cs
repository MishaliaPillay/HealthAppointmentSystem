using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using healthap.Domain.Appointments;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.AppointmentServices
{
    public class AppointmentAppService : AsyncCrudAppService<Appointment, AppointmentDto, Guid>, IAppointmentAppService
    {
        public AppointmentAppService(IRepository<Appointment, Guid> repository) : base(repository)
        {
        }

        public override Task<AppointmentDto> CreateAsync(AppointmentDto input)
        {

            return base.CreateAsync(input);

            // Format the cell number
            var ts = "0825185584";
            var cell = "+27" + ts.Substring(1);

            // Send SMS (also assuming it's a static method)
            Services.NotificaServices.SmsService.SendMessage(cell, $"Good day, your appointment is sucessfully submited for the date {input.AppointmentDate} and the time{input.AppointmentTime}.");

        }
    }
}

using System;
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

    }
}

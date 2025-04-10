using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using HealthAPP.Domain.Appointments;
using HealthAPP.Sevice.AppointmentService.Dtos;

namespace HealthAPP.Sevice.AppointmentService
{
    public class AppointmentAppService : AsyncCrudAppService<Appointment, AppointmentDto, Guid>, IAppointmentAppService
    {
        public AppointmentAppService(IRepository<Appointment, Guid> repository) : base(repository)
        {
        }
    }
}

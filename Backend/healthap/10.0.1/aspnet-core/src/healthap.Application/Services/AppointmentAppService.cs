using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using healthap.Domain;
using healthap.Services.Dtos;

namespace healthap.Services
{
    public class AppointmentAppService : AsyncCrudAppService<Appointment, AppointmentDto, Guid>, IAppointmentAppService
    {
        public AppointmentAppService(IRepository<Appointment, Guid> repository) : base(repository)
        {
        }

    }
}

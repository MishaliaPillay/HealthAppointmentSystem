using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using HealthAPP.Sevice.AppointmentService.Dtos;

namespace HealthAPP.Sevice.AppointmentService
{
    public interface IAppointmentAppService : IAsyncCrudAppService<AppointmentDto, Guid>
    {
    }
}

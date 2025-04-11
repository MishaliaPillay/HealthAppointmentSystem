using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using healthap.Services.Dtos;

namespace healthap.Services
{
    public interface IAppointmentAppService : IAsyncCrudAppService<AppointmentDto, Guid>
    {

    }
}

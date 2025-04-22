using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using healthap.Domain.Appointments;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.AppointmentServices
{
    public interface IAppointmentAppService : IAsyncCrudAppService<AppointmentDto, Guid , PagedAndSortedResultRequestDto>
    {
        public Task<AppointmentDto> CreateAsync(AppointmentDto input);
        public Task<PagedResultDto<AppointmentDto>> GetAllAsync(PagedAndSortedResultRequestDto input);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HealthAPP.Services.PersonService.Dto;

namespace HealthAPP.Services.PersonService
{

    public interface IPatientAppService : IAsyncCrudAppService<PatientResponseDto, Guid, PagedAndSortedResultRequestDto, PatientRequestDto, PatientResponseDto>
    {
        public Task<PatientResponseDto> CreateAsync(PatientRequestDto input);
    }
}

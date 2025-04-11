using Abp.Application.Services.Dto;
using HealthAPP.Services.PatientServices.PatientDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthAPP.Services.PatientServices.PatientDto
{
    public interface IPatientService
    {

        Task<PatientDto> GetPatientAsync(Guid id);
        Task<PagedResultDto<PatientDto>> GetAllPatientsAsync(GetPatientsInput input);
        Task<PatientDto> CreatePatientAsync(CreatePatientDto input);
        Task<PatientDto> UpdatePatientAsync(UpdatePatientDto input);
        Task DeletePatientAsync(Guid id);
    }
}

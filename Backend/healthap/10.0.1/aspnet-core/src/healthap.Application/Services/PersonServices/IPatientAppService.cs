using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices
{
    public interface IPatientAppService : IAsyncCrudAppService<PatientResponseDto, Guid, PagedAndSortedResultRequestDto, PatientRequestDto, PatientResponseDto>
	{
		public Task<PatientResponseDto> UpdatePatientAsync(UpdatePatientDto input);
		public Task<PatientResponseDto> GetCurrentPatientAsync(long id);
	}
}

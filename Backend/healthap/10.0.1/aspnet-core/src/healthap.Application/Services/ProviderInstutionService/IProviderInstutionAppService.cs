using System.Collections.Generic;
using System.Threading.Tasks;
using healthap.Services.ProviderInstutionService.ProviderInstutionDto;

namespace healthap.Services.ProviderInstutionService
{
    public interface IProviderInstutionAppService
    {


        /// <param name="institutionId">ID of the institution</param>
        Task<List<ProviderInstutionsDto>> GetProvidersInInstitutionAsync(int institutionId);

        /// <param name="speciality">Speciality name</param>

        // Task<List<ProviderInstutionsDto>> GetProvidersBySpecialityAsync(string speciality);

        /// <param name="institutionId">ID of the institution</param>
        //Task<List<ProviderInstutionsDto>> GetAvailableProvidersInInstitutionAsync(int institutionId);
        Task<List<InstitutionWithProvidersDto>> GetInstitutionsWithProvidersBySpecialtyAsync(string specialty);

    }
}

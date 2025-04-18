using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using healthap.Services.Institutions.Dto;

namespace healthap.Services.Institutions
{
    public interface IInstitutionAppService : IAsyncCrudAppService<
        InstitutionDto,           // Used to show institutions
        int,                      // Primary key type
        GetInstitutionListInput,  // Used for filtering
        CreateInstitutionDto,     // Used for creating
        UpdateInstitutionDto>     // Used for updating
    {
        Task<ListResultDto<InstitutionDto>> GetAllInstitutionsAsync();
        Task<PagedResultDto<InstitutionListDto>> SearchInstitutionsAsync(GetInstitutionListInput input);
        Task<ListResultDto<InstitutionDto>> GetLocationsFromGooglePlacesAsync(string query, string region = "za");
        Task ImportLocationFromGooglePlacesAsync(string placeId);
    }
}

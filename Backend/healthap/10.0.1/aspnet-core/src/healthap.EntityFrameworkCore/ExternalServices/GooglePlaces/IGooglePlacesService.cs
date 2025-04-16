using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using healthap.Domain.Institution;

namespace healthap.ExternalServices.GooglePlaces
{
    public interface IGooglePlacesService
    {
        Task<List<Institution>> SearchHealthcareInstitutionsAsync(string query, string region = "za");
        Task<Institution> GetPlaceDetailsAsync(string placeId);
    }

}

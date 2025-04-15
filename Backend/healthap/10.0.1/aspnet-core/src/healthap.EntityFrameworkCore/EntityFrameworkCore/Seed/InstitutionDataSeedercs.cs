using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NuGet.Protocol.Core.Types;

namespace healthap.EntityFrameworkCore.Seed
{
    public async Task SeedInstitutionsFromGoogleBySuburbAsync()
    {
        var suburbs = new List<string>
    {
        "Sandton",
        "Lenasia",
        "Midrand",
        "Soweto",
        "Centurion",
        "Pretoria",
        "Durban",
        "Cape Town",
        "East London",
        "Polokwane"
        // Add more as needed
    };

        var typesWithKeywords = new Dictionary<string, string>
    {
        { "Hospital", "hospital" },
        { "Doctor's Office", "doctor" },
        { "Dental Clinic", "dentist" },
        { "Healthcare Facility", "clinic" }
    };

        foreach (var suburb in suburbs)
        {
            foreach (var (facilityType, keyword) in typesWithKeywords)
            {
                var query = $"{keyword} in {suburb}, South Africa";
                var institutions = await _googlePlacesService.SearchHealthcareInstitutionsAsync(query);

                var match = institutions.FirstOrDefault(i =>
                    i.FacilityType == facilityType &&
                    i.City?.Equals(suburb, StringComparison.OrdinalIgnoreCase) == true
                );

                if (match != null)
                {
                    var exists = await Repository.FirstOrDefaultAsync(i => i.PlaceId == match.PlaceId);
                    if (exists == null)
                    {
                        await Repository.InsertAsync(match);
                    }
                }
            }
        }
    }

}

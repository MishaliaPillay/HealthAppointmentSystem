using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.Domain.Repositories;
using healthap.Domain.Institution;
using healthap.ExternalServices.GooglePlaces;

namespace healthap.EntityFrameworkCore.Seed
{
    public class InstitutionDataSeeder : ITransientDependency
    {
        private readonly IRepository<Institution, int> _repository;
        private readonly IGooglePlacesService _googlePlacesService;

        public InstitutionDataSeeder(
            IRepository<Institution, int> repository,
            IGooglePlacesService googlePlacesService)
        {
            _repository = repository;
            _googlePlacesService = googlePlacesService;
        }

        public async Task SeedInstitutionsFromGoogleBySuburbAsync()
        {
            var suburbs = new List<string>
            {
                "Sandton", "Lenasia", "Midrand", "Soweto", "Centurion",
                "Pretoria", "Durban", "Cape Town", "East London", "Polokwane"
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
                        var exists = await _repository.FirstOrDefaultAsync(i => i.PlaceId == match.PlaceId);
                        if (exists == null)
                        {
                            await _repository.InsertAsync(match);
                        }
                    }
                }
            }
        }
    }
}

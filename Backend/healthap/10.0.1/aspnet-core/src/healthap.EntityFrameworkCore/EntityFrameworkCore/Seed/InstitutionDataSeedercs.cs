using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using healthap.Domain.Institution;
using healthap.ExternalServices.GooglePlaces;

namespace healthap.EntityFrameworkCore.Seed
{
    public class InstitutionDataSeeder : ITransientDependency
    {
        private readonly IRepository<Institution, int> _repository;
        private readonly IGooglePlacesService _googlePlacesService;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public InstitutionDataSeeder(
            IRepository<Institution, int> repository,
            IGooglePlacesService googlePlacesService,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _repository = repository;
            _googlePlacesService = googlePlacesService;
            _unitOfWorkManager = unitOfWorkManager;
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
                    try
                    {
                        using (var uow = _unitOfWorkManager.Begin())
                        {
                            var query = $"{keyword} in {suburb}, South Africa";
                            var placeResults = await _googlePlacesService.SearchHealthcareInstitutionsAsync(query);

                            foreach (var place in placeResults)
                            {
                                var existingInstitution = await _repository.FirstOrDefaultAsync(i => i.PlaceId == place.PlaceId);
                                if (existingInstitution == null)
                                {
                                    // Mapping Google Places data to Institution entity
                                    var institution = new Institution
                                    {
                                        PlaceId = place.PlaceId,
                                        Address = place.Address,
                                        City = place.City ?? suburb,
                                        State = place.State,
                                        PostalCode = place.PostalCode,
                                        Country = "South Africa",
                                        FacilityType = facilityType,
                                        Description = place.Description,
                                        Latitude = place.Latitude,
                                        Longitude = place.Longitude,
                                        GoogleMapsUrl = place.GoogleMapsUrl
                                    };

                                    await _repository.InsertAsync(institution);
                                }
                            }

                            await uow.CompleteAsync();
                        }

                        // Delay to avoid hitting API rate limits
                        await Task.Delay(1000);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error seeding {facilityType} in {suburb}: {ex.Message}");
                    }
                }
            }
        }
    }
}

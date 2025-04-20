using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using healthap.Domain.Institution;
using healthap.EntityFrameworkCore.Seed;
using healthap.ExternalServices.GooglePlaces;
using healthap.Services.Institutions.Dto;
using Microsoft.EntityFrameworkCore;

namespace healthap.Services.Institutions
{
    public class InstitutionAppService : AsyncCrudAppService<
        Institution,
        InstitutionDto,
        int,
        GetInstitutionListInput,
        CreateInstitutionDto,
        UpdateInstitutionDto
    >, IInstitutionAppService
    {
        private readonly IGooglePlacesService _googlePlacesService;
        private readonly InstitutionDataSeeder _institutionDataSeeder;

        public InstitutionAppService(
            IRepository<Institution, int> repository,
            IGooglePlacesService googlePlacesService,
            InstitutionDataSeeder institutionDataSeeder // Inject the seeder
        ) : base(repository)
        {
            _googlePlacesService = googlePlacesService;
            _institutionDataSeeder = institutionDataSeeder;
        }

        public async Task<ListResultDto<InstitutionDto>> GetAllInstitutionsAsync()
        {
            try
            {
                var institutions = await Repository.GetAllListAsync();
                Logger.Info($"Number of institutions retrieved: {institutions.Count}");

                return new ListResultDto<InstitutionDto>(
                    ObjectMapper.Map<List<InstitutionDto>>(institutions)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving all institutions", ex);
                throw;
            }
        }


        public async Task<PagedResultDto<InstitutionListDto>> SearchInstitutionsAsync(GetInstitutionListInput input)
        {
            var query = Repository.GetAll()
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), l =>
                    l.Address.Contains(input.Filter) ||
                    l.City.Contains(input.Filter) ||
                    l.Description.Contains(input.Filter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.City), l => l.City == input.City)
                .WhereIf(!string.IsNullOrWhiteSpace(input.FacilityType), l => l.FacilityType == input.FacilityType);

            var totalCount = await query.CountAsync();
            var institutions = await query
                .OrderBy(input.Sorting ?? "Id")
                .PageBy(input)
                .ToListAsync();

            return new PagedResultDto<InstitutionListDto>(
                totalCount,
                ObjectMapper.Map<List<InstitutionListDto>>(institutions)
            );
        }

        public async Task<ListResultDto<InstitutionDto>> GetLocationsFromGooglePlacesAsync(string query, string region = "za")
        {
            var places = await _googlePlacesService.SearchHealthcareInstitutionsAsync(query, region);
            return new ListResultDto<InstitutionDto>(
                ObjectMapper.Map<List<InstitutionDto>>(places)
            );
        }

        public async Task ImportLocationFromGooglePlacesAsync(string placeId)
        {
            var placeDetails = await _googlePlacesService.GetPlaceDetailsAsync(placeId);
            var institution = ObjectMapper.Map<Institution>(placeDetails);
            await Repository.InsertAsync(institution);
        }

        //public async Task SeedFromGoogleAsync()
        //{
        //    await _institutionDataSeeder.SeedInstitutionsFromGoogleBySuburbAsync();
        //    await CurrentUnitOfWork.SaveChangesAsync();
        //}

        public async Task SeedFromGoogleAsync()
        {
            try
            {
                Logger.Info("Starting institution seeding from Google Places...");
                await _institutionDataSeeder.SeedInstitutionsFromGoogleBySuburbAsync();

                Logger.Info("Completed institution seeding from Google Places");
            }
            catch (Exception ex)
            {
                Logger.Error("Error during institution seeding from Google Places", ex);
                throw;
            }
        }
    }
}

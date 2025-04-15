using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using healthap.Domain.Institution;
using healthap.ExternalServices.GooglePlaces;
using healthap.Services.Institutions.Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using Abp.Authorization;
using healthap.Authorization;
using healthap.EntityFrameworkCore.Seed;

namespace healthap.Services.Institutions
{
    public class InstitutionAppService : AsyncCrudAppService<Institution, InstitutionDto, int, GetInstitutionListInput, CreateInstitutionDto, UpdateInstitutionDto>, IInstitutionAppService
    {
        private readonly IGooglePlacesService _googlePlacesService;
        private readonly InstitutionDataSeeder _institutionDataSeeder;

        public InstitutionAppService(
            IRepository<Institution, int> repository,
            IGooglePlacesService googlePlacesService,
            InstitutionDataSeeder institutionDataSeeder) // Inject here
            : base(repository)
        {
            _googlePlacesService = googlePlacesService;
            _institutionDataSeeder = institutionDataSeeder; // Assign here
        }

        [AbpAuthorize(PermissionNames.Pages_Institutions_Seed)]
        public async Task SeedFromGoogleAsync()
        {
            await _institutionDataSeeder.SeedInstitutionsFromGoogleBySuburbAsync(); // Call the method from the injected service
        }
    }

}

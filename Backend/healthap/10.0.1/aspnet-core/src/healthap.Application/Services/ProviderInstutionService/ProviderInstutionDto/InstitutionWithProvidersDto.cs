using System.Collections.Generic;

namespace healthap.Services.ProviderInstutionService.ProviderInstutionDto
{
    public class InstitutionWithProvidersDto
    {
        public int InstitutionId { get; set; }
        public string InstitutionName { get; set; } // Add if you have name
        public string Address { get; set; }

        public List<ProviderInstutionsDto> Providers { get; set; }
    }

}

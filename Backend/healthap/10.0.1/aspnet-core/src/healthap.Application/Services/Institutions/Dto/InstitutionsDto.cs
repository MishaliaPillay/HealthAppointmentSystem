using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using healthap.Domain.Institution;

namespace healthap.Services.Institutions.Dto
{
    [AutoMapFrom(typeof(Institution))]
    [AutoMapTo(typeof(Institution))]
    public class InstitutionDto : EntityDto<int>
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string FacilityType { get; set; }
        public string Description { get; set; }

        //  for Google Places
        public string PlaceId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string GoogleMapsUrl { get; set; }
    }


    public class CreateInstitutionDto
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string FacilityType { get; set; }
        public string Description { get; set; }
        public string PlaceId { get; set; }
    }

    public class UpdateInstitutionDto : CreateInstitutionDto, IEntityDto<int>
    {
        public int Id { get; set; }
    }

    // For searching and pagination
    public class InstitutionListDto : EntityDto<int>
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string FacilityType { get; set; }
        public string Description { get; set; }
    }

    public class GetInstitutionListInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
        public string City { get; set; }
        public string FacilityType { get; set; }
    }

}

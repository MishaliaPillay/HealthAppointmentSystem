using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using healthap.Domain.Persons;
using healthap.Domain.Location;

namespace healthap.Services.location.Dto
{
    public class LocationSearchDto : EntityDto<int>
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public List<NearbyProviderDto> NearbyProviders { get; set; }
    }

    public class NearbyProviderDto : EntityDto<Guid>
    {
        public string ProviderName { get; set; }
        public string Title { get; set; }
        public string Specialty { get; set; }
        public double DistanceInKm { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public int YearsOfExperience { get; set; }
    }
} 
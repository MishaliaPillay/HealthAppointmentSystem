using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.location.Dto
{
    /// <summary>
    /// DTO for location information returned from the API
    /// </summary>
    public class LocationDto : EntityDto<int>
    {
        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string PostalCode { get; set; }

        public string Country { get; set; }

        public string Description { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }
    }

    /// <summary>
    /// Input DTO for getting location from IP
    /// </summary>
    public class GetLocationFromIpInput
    {
        /// <summary>
        /// Optional IP address to use for location lookup.
        /// If not provided, the client's IP address will be used.
        /// </summary>
        [StringLength(50)]
        public string IpAddress { get; set; }
    }
}

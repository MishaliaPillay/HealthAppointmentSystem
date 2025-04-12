using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace healthap.Domain.Location
{
    /// <summary>
    /// Represents a geographical location with address information
    /// </summary>
    public class Location : Entity<int>, IHasCreationTime
    {
        [Required]
        [StringLength(200)]
        public string Address { get; set; }

        [Required]
        [StringLength(100)]
        public string City { get; set; }

        [StringLength(100)]
        public string State { get; set; }

        [StringLength(30)]
        public string PostalCode { get; set; }

        [Required]
        [StringLength(100)]
        public string Country { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        // IHasCreationTime implementation
        public DateTime CreationTime { get; set; }

        // Default constructor for EF
        public Location() { }

        // Constructor with required fields
        public Location(
            string address,
            string city,
            string country,
            string state = null,
            string postalCode = null,
            string description = null,
            double? latitude = null,
            double? longitude = null)
        {
            Address = address ?? throw new ArgumentNullException(nameof(address));
            City = city ?? throw new ArgumentNullException(nameof(city));
            Country = country ?? throw new ArgumentNullException(nameof(country));
            State = state;
            PostalCode = postalCode;
            Description = description;
            Latitude = latitude;
            Longitude = longitude;
            CreationTime = DateTime.Now;
        }

        public override string ToString()
        {
            return $"{Address}, {City}, {State}, {PostalCode}, {Country}";
        }
    }
}

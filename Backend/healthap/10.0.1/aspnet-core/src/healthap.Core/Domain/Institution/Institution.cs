using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using healthap.Domain.Appointments;

namespace healthap.Domain.Institution
{

    public class Institution : FullAuditedEntity<int>
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string FacilityType { get; set; }
        public string Description { get; set; }

        public virtual ICollection<ProviderLocation> Providers { get; set; }
        // public virtual ICollection<Appointment> Appointments { get; set; }

        //  for Google Places integration
        public string PlaceId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string GoogleMapsUrl { get; set; }

        public Institution()
        {
            Providers = new List<ProviderLocation>();
            //Appointments = new List<Appointment>();
        }
    }

}

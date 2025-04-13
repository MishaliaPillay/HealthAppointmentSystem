using Abp.Domain.Entities;
using healthap.Domain.Persons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Domain.Location
{
    public class ProviderLocation : Entity
    {
        public Guid ProviderId { get; set; }
        public Guid LocationId { get; set; }

        // Navigation properties
        public virtual Provider Provider { get; set; }
        public virtual Location Location { get; set; }

        // Override IsTransient 
        public override bool IsTransient()
        {
            return ProviderId == Guid.Empty || LocationId == Guid.Empty;
        }
    }
}

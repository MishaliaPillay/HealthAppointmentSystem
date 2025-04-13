using Abp.Domain.Entities;
using healthap.Domain.Persons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Domain.Specilality
{
    public class Speciality : Entity
    {
        public SpecialtyName SpecialtyName { get; set; }
        public Guid ProviderId { get; set; }

        // Navigation property
        public virtual Provider Provider { get; set; }


        public override bool IsTransient()
        {
            return ProviderId == Guid.Empty;
        }
    }
}

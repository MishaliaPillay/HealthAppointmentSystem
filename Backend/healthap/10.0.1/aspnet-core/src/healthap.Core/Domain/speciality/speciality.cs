using System;
using System.Collections.Generic;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using healthap.Domain.Appointments;
using healthap.Domain.Institution;
using healthap.Domain.Persons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.MultiTenancy.speciality
{
    public class Speciality : FullAuditedEntity<Guid>
    {
        public RefistSpecialty SpecialtyName { get; set; }
        public Guid ProviderId { get; set; }

        // Navigation property
        public virtual Provider Provider { get; set; }

       

    }
}

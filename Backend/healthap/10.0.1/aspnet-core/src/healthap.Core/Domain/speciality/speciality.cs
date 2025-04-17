using System;
using Abp.Domain.Entities;
using healthap.Domain.Persons;

namespace healthap.MultiTenancy.speciality
{
    public class Speciality : Entity
    {
        public RefistSpecialty SpecialtyName { get; set; }
        public Guid ProviderId { get; set; }

        // Navigation property
        public virtual Provider Provider { get; set; }

    }
}

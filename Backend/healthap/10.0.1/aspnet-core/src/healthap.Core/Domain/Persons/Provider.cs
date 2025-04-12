using System;
using System.Collections.Generic;
using Abp.Domain.Entities.Auditing;
using healthap.Authorization.Users;
using System.ComponentModel.DataAnnotations.Schema;
using healthap.Domain.Appointments;
using System.ComponentModel.DataAnnotations;

namespace healthap.Domain.Persons
{
    public class Provider : FullAuditedEntity<Guid>
    {
        [Required]
        public long UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
        public virtual ICollection<ProviderAvailabilty>? Availabilities { get; set; } = null;
        public virtual ICollection<Appointment>? Appointments { get; set; } = null;
    }
}

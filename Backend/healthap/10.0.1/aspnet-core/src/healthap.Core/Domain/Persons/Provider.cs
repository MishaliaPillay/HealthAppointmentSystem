using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;

namespace healthap.Domain.Persons
{
    public class Provider : FullAuditedEntity<Guid>
    {
        [Required]
        public long UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public string Title { get; set; }
        public string Biography { get; set; }
        public string PhoneNumber { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
        public string SpecialityName { get; set; }
        public int InstitutionId { get; set; }
        public virtual healthap.Domain.Institution.Institution Institution { get; set; }
        public virtual ICollection<ProviderAvailabilty>? Availabilities { get; set; } = null;
        public virtual ICollection<Appointment>? Appointments { get; set; } = null;
    }
}

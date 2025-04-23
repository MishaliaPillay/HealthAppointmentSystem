using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using healthap.Domain.Persons;

namespace healthap.Domain.Appointments
{
    public class Appointment : FullAuditedEntity<Guid>
    {
        [Required]
        [ForeignKey("ProviderId")] public Guid ProviderId { get; set; }

        [Required]
        [ForeignKey("PatientId")] public Guid PatientId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; } 
        [Required]
        public TimeSpan AppointmentTime { get; set; } 
        public string Purpose { get; set; }
        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }

    }
}

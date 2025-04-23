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
        //public Provider Provider { get; set; }
        [Required]
        [ForeignKey("PatientId")] public Guid PatientId { get; set; }
        //public Patient Patient { get; set; }
        [Required]
        public DateTime AppointmentDate { get; set; } // Holds the date part of the appointment
        [Required]
        public TimeSpan AppointmentTime { get; set; } // Holds the time part of the appointment
        public string Purpose { get; set; }
        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }

    }
}

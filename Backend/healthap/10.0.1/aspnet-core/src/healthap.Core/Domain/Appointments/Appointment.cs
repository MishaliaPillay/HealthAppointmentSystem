using System;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities.Auditing;
using healthap.Domain.Persons; // <-- Make sure to add the Patient class here

namespace healthap.Domain.Appointments
{
    public class Appointment : FullAuditedEntity<Guid>
    {
        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public TimeSpan AppointmentTime { get; set; }

        public string Purpose { get; set; }

        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }


        [Required]
        public Guid ProviderId { get; set; }

        public virtual Provider Provider { get; set; }


        [Required]
        public Guid PatientId { get; set; }

        public virtual Patient Patient { get; set; }  // Assuming you have a Patient class
    }
}

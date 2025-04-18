using System;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities.Auditing;

namespace healthap.Domain.Appointments
{
    public class Appointment : FullAuditedEntity<Guid>
    {
        [Required]
        public DateTime AppointmentDate { get; set; } // Holds the date part of the appointment

        [Required]
        public TimeSpan AppointmentTime { get; set; } // Holds the time part of the appointment
        public string Purpose { get; set; }
        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }

    }
}

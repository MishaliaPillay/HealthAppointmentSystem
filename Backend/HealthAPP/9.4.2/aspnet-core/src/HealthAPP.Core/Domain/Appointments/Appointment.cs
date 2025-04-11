using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace HealthAPP.Domain.Appointments
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

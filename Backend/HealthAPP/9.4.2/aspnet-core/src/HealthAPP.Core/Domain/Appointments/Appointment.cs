//using Abp.Domain.Entities.Auditing;
//using HealthAPP.Domain.Persons;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace HealthAPP.Domain.Appointments
//{
//    public class Appointment : FullAuditedEntity<Guid>
//    {
//        [Required]
//        public DateTime AppointmentDate { get; set; } // Holds the date part of the appointment

//        [Required]
//        public TimeSpan AppointmentTime { get; set; } // Holds the time part of the appointment
//        public string Purpose { get; set; }
//        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }

//        //Nav properties with Patient and Provider Entities
//        public Guid PatientId { get; set; }
//        public virtual Patient Patient { get; set; }

//        public Guid ProviderId { get; set; }
//        public virtual Provider Provider { get; set; }
//    }
//}

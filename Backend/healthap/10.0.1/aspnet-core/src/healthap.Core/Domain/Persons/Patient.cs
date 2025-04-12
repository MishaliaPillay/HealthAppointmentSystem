using System;
using System.Collections.Generic;
using Abp.Domain.Entities.Auditing;
using healthap.Authorization.Users;
using System.ComponentModel.DataAnnotations.Schema;
using healthap.Domain.Appointments;
using System.ComponentModel.DataAnnotations;

namespace healthap.Domain.Persons
{
    public class Patient : FullAuditedEntity<Guid>
    {
        [Required]
        public long UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public string Title { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public virtual ReflistConMethod PreferredContactMedthod { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
}

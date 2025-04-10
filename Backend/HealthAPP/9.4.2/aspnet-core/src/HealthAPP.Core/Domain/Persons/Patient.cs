using System;
using System.Collections.Generic;
using HealthAPP.Domain.Appointments;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HealthAPP.Domain.Persons
{
    public class Patient : Person
    {
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public int Country { get; set; }
        public virtual ReflistConMethod PreferredContactMedthod { get; set; }
        // public virtual ICollection<Appointment> Appointments { get; set; }
    }
}

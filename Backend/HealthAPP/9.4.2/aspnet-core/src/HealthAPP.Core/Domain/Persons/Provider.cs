using System.Collections.Generic;
using HealthAPP.Domain.Appointments;

namespace HealthAPP.Domain.Persons
{
    public class Provider : Person
    {
        public string Title { get; set; }
        public string Biography { get; set; }

        public string YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }

        //TODO:KM cam be a list of type Qualification ?
        public string Qualification { get; set; }
        //TODO:Find out if virtual
        //public virtual ICollection<Specialty> Specialty { get; set; }
        public virtual ICollection<ProviderAvailabilty> Availabilities { get; set; }
        //public virtual ICollection<Locations> Locations { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }


    }
}

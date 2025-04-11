using System.Collections.Generic;
using healthap.Domain.Appointments;

namespace healthap.Domain.Persons
{
    public class Provider : Person
    {
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }

        //TODO:KM cam be a list of type Qualification ?
        public string Qualification { get; set; }
        //TODO:KM Find out if virtual
        //public virtual ICollection<Specialty> Specialty { get; set; }
        public virtual ICollection<ProviderAvailabilty>? Availabilities { get; set; } = null;
        //public virtual ICollection<Locations> Locations { get; set; }
        public virtual ICollection<Appointment>? Appointments { get; set; } = null;


    }
}

using System;
using HealthAPP.Domain.Persons;

namespace HealthAPP.Services.PersonService.Dto
{
    public class PatientRequestDto:PersonRequestDto
    {
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public int Country { get; set; }
        public ReflistConMethod PreferredContactMethod { get; set; }
    }
}

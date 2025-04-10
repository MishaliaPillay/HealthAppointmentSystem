using System;
using System.Collections.Generic;
using HealthAPP.Domain.Persons;

namespace HealthAPP.Services.PersonService.Dto
{
    public class PatientResponseDto: ResponsePersonDto
    {
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public int Country { get; set; }
        public ReflistConMethod PreferredContactMedthod { get; set; }
        public List<AppointmentDto> Appointments { get; set; }
    }
}

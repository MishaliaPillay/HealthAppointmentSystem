using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.PersonServices.Dtos
{
    public class PatientResponseDto : PersonRequestDto
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

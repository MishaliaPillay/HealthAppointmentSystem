using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using healthap.Domain.Persons;

namespace healthap.Services.PersonServices.Dtos
{
    public class PatientRequestDto : PersonRequestDto
    {
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public ReflistConMethod PreferredContactMethod { get; set; }
    }
}

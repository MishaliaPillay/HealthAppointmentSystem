using System;
using healthap.Domain.Persons;

namespace healthap.Services.PersonServices.Dtos
{
    
    public class PatientRequestDto : UserRequestDto
    {
        public string Title { get; set; }
        public DateTime DateOfBirth { get; set; }
        public  string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public ReflistConMethod PreferredContactMethod { get; set; }
    }
}

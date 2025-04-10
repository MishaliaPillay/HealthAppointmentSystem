using Abp.AutoMapper;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.PersonServices.PersonDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthAPP.Services.PatientServices.PatientDto
{
    [AutoMapFrom(typeof(Patient))]
    public class PatientDto : PersonDto
    {
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public int Country { get; set; }
        public ReflistConMethod PreferredContactMedthod { get; set; }
    }
}

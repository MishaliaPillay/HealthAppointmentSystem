using Abp.AutoMapper;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.PersonServices.PersonDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthAPP.Services.ProviderServices.ProviderDto
{
    [AutoMap(typeof(Provider))]
    public class ProvidersDto : PersonDto
    {
        public string Title { get; set; }
        public string Biography { get; set; }
        public string YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
    }
}

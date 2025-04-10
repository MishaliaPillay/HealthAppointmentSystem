using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HealthAPP.Domain.Persons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthAPP.Services.PersonServices.PersonDto
{
    [AutoMapTo(typeof(Person))]
    public class UpdatePersonDto : EntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
    }
}

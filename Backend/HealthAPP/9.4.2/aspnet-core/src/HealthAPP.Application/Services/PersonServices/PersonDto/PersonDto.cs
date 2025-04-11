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
    [AutoMap(typeof(Person))]
    public class PersonDto : EntityDto<Guid>
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
    }







}

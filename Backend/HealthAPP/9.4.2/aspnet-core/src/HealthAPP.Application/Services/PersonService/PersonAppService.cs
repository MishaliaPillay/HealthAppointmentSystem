using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.PersonService.Dto;

namespace HealthAPP.Services.PersonService
{
    public class PersonAppService : AsyncCrudAppService<Person, PersonRequestDto, Guid>
    {
        private readonly PersonManager _personMananger;
        public PersonAppService(IRepository<Person,Guid>repository , PersonManager personMananger) :base(repository)
        {
            _personMananger = personMananger;
        }
    }
}

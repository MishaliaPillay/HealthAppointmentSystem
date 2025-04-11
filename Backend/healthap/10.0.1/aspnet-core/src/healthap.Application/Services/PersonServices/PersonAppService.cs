using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using healthap.Domain.Persons;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices
{
    public class PersonAppService : AsyncCrudAppService<Person, PersonRequestDto, Guid>
    {
        private readonly PersonManager _personMananger;
        public PersonAppService(IRepository<Person, Guid> repository, PersonManager personMananger) : base(repository)
        {
            _personMananger = personMananger;
        }
    }
}

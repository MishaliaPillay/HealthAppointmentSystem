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
    public class ProviderAppService : AsyncCrudAppService<Provider, ProviderRequestDto, Guid>
    {
        private readonly ProviderManager _providerMananger;
        public ProviderAppService(IRepository<Provider, Guid> repository, ProviderManager providerManager) : base(repository)
        {
            _providerMananger = providerManager;
        }

    }
}

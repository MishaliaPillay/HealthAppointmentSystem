using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using AutoMapper;
using HealthAPP.Authorization.Users;

namespace HealthAPP.Domain.Persons
{
    public class ProviderManager : DomainService
    {
        private readonly PersonManager _personManger;
        private readonly IRepository<Provider, Guid> _providerRepository;

        public ProviderManager(UserManager _personManger, IRepository<Provider, Guid> providerRepository)
        {
            _providerRepository = providerRepository;
            _personManger = _personManger;
        }

        public async Task<Person> CreateProviderAsync(string firstName, string surname, string emailAddress, string username, string password, string title, string biography ,int yearsOfExperience,int maxApp,string qauli)

        {
            try
            {
                CreateProfileAsync


               var provider = new Provider
                {
                    Title=title,
                    Biography=biography,
                    YearsOfExperience= yearsOfExperience,
                    MaxAppointmentsPerDay= maxApp,
                    Qualification= qauli,

                    UserId = user.Id,
                    User = user
                };
                //creates the person
                return await _providerRepository.InsertAsync(provider);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

    }
}

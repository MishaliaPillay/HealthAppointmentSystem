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
        private readonly UserManager _userManager;
        private readonly IRepository<Provider, Guid> _providerRepository;

        public ProviderManager(UserManager userManager, IRepository<Provider, Guid> providerRepository)
        {
            _providerRepository = providerRepository;
            _userManager = userManager;
        }

        public async Task<Person> CreateProviderAsync(string firstName, string surname, string emailAddress, string username, string password, string title, string biography ,int yearsOfExperience,int maxApp,string qauli)

        {
            try
            {
                var user = new User
                {
                    Name = firstName,
                    Surname = surname,
                    EmailAddress = emailAddress,
                    UserName = username
                };

                var identityResult = await _userManager.CreateAsync(user, password);


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

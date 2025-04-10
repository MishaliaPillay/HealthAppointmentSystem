using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using HealthAPP.Domain.Appointments;

namespace HealthAPP.Domain.Persons
{
    public class ProviderManager : DomainService
    {
        private readonly PersonManager _personManager;
        private readonly IRepository<Provider, Guid> _providerRepository;

        public ProviderManager(PersonManager personManager, IRepository<Provider, Guid> providerRepository)
        {
            _providerRepository = providerRepository;
            _personManager = personManager;
        }

        public async Task<Person> CreateProviderAsync(string firstName, string surname, string emailAddress, string phonenumber, string username, string password,string role ,string title, string biography ,int yearsOfExperience,int maxApp,string qauli)

        {
            try
            {
               var provider = new Provider
                {
                    FirstName = firstName,
                    Surname = surname,
                    Email=emailAddress,
                    PhoneNumber= phonenumber,
                    UserName = username,
                    Role=role,
                    Title =title,
                    Biography=biography,
                    YearsOfExperience= yearsOfExperience,
                    MaxAppointmentsPerDay= maxApp,
                    Qualification= qauli,
                    Appointments=new List<Appointment>(),
                    Availabilities=new List<ProviderAvailabilty>(),
               };
                //creates the person
                await _personManager.CreatePersonAsync(provider, password);

                return provider;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating provider", ex);
                throw new UserFriendlyException("An error occured while creating your provider", ex);
                throw;
            }

        }

    }
}

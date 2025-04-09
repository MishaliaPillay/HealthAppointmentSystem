using Abp.Domain.Repositories;
using System;
using Abp.Domain.Services;
using AutoMapper;
using HealthAPP.Authorization.Users;
using System.Threading.Tasks;

namespace HealthAPP.Domain.Persons
{
    public class PersonManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Person, Guid> _personRepository;

        public PersonManager(UserManager userManager, IRepository<Person, Guid> personRepository)
        {
            _personRepository = personRepository;
            _userManager = userManager;
        }


        public async Task<Person> CreateProfileAsync(string firstName, string surname, string emailAddress, string username, string password, string role)
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
                //creates the user
                //TODO:Validate if the creation of the user  has succeeded 
                var identityResult = await _userManager.CreateAsync(user, password);

                var profile = new Person
                {
                    Role = role,
                    UserId = user.Id,
                    User = user
                };
                //creates the person
                return await _personRepository.InsertAsync(profile);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}

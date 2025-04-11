using System;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using healthap.Authorization.Users;

namespace healthap.Domain.Persons
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

        public async Task<Person> CreatePersonAsync(Person person, string password)
        {
            try
            {
                var user = new User
                {
                    Name = person.FirstName,
                    Surname = person.Surname,
                    EmailAddress = person.Email,
                    UserName = person.UserName,
                    PhoneNumber = person.PhoneNumber,
                    IsActive = true,
                    IsEmailConfirmed = true

                };
                //creates the user with Password 
                var identityResult = await _userManager.CreateAsync(user, password);
                if (identityResult.Succeeded)
                {
                    throw new UserFriendlyException("Could not create user");
                }
                if (!string.IsNullOrEmpty(person.Role))
                {
                    await _userManager.AddToRoleAsync(user, person.Role);
                }
                person.UserId = user.Id;
                person.User = user;

                //creates the person
                return await _personRepository.InsertAsync(person);
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating hte person", ex);
                throw new UserFriendlyException("An error occured while create the person", ex);
            }

        }
    }
}

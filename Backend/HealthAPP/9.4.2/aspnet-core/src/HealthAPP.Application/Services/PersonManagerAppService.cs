//using Abp.Application.Services;
//using Abp.Application.Services.Dto;
//using Abp.Domain.Repositories;
//using Abp.Domain.Uow;
//using Abp.Runtime.Session;
//using Abp.UI;
//using HealthAPP.Authorization.Users;
//using HealthAPP.Domain.Appointments;
//using HealthAPP.Domain.Persons;
//using HealthAPP.Services.PatientServices.PatientDto;
//using HealthAPP.Services.PersonServices.PersonDto;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Logging.Abstractions;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace HealthAPP.Services
//{
//    public class PersonManagerAppService : ApplicationService, IApplicationService
//    {
//        private readonly IRepository<Person, Guid> _personRepository;
//        private readonly IRepository<Patient, Guid> _patientRepository;
//        private readonly IRepository<Provider, Guid> _providerRepository;
//        private readonly UserManager _userManager;

//        public ILogger Logger { get; set; }

//        public PersonManagerAppService(
//            IRepository<Person, Guid> personRepository,
//            IRepository<Patient, Guid> patientRepository,
//            IRepository<Provider, Guid> providerRepository,
//            UserManager userManager)
//        {
//            _personRepository = personRepository;
//            _patientRepository = patientRepository;
//            _providerRepository = providerRepository;
//            _userManager = userManager;

//            Logger = NullLogger.Instance;
//        }

//        #region Person Operations

//        public async Task<PersonDto> GetPersonAsync(Guid id)
//        {
//            var person = await _personRepository.GetAsync(id);
//            return ObjectMapper.Map<PersonDto>(person);
//        }

//        public async Task<PersonDto> GetPersonByUserIdAsync(long userId)
//        {
//            var person = await _personRepository
//                .GetAll()
//                .Include(p => p.User)
//                .FirstOrDefaultAsync(p => p.User != null && p.User.Id == userId);

//            if (person == null)
//            {
//                throw new UserFriendlyException("Person not found for this user");
//            }

//            return ObjectMapper.Map<PersonDto>(person);
//        }

//        public async Task<PersonDto> GetPersonByEmailAsync(string email)
//        {
//            if (string.IsNullOrWhiteSpace(email))
//            {
//                throw new ArgumentNullException(nameof(email));
//            }

//            var person = await _personRepository
//                .GetAll()
//                .FirstOrDefaultAsync(p => p.Email.ToLower() == email.ToLower());

//            if (person == null)
//            {
//                throw new UserFriendlyException("Person not found with this email");
//            }

//            return ObjectMapper.Map<PersonDto>(person);
//        }

//        public async Task<PagedResultDto<PersonDto>> GetAllPersonsAsync(GetPersonsInput input)
//        {
//            var query = _personRepository.GetAll();

//            // Apply filter if provided
//            if (!string.IsNullOrWhiteSpace(input.Filter))
//            {
//                var filter = input.Filter.ToLower();
//                query = query.Where(p =>
//                    p.FirstName.ToLower().Contains(filter) ||
//                    p.LastName.ToLower().Contains(filter) ||
//                    p.Email.ToLower().Contains(filter));
//            }

//            var totalCount = await query.CountAsync();

//            // Apply sorting and paging
//            query = ApplySorting(query, input);
//            query = query.Skip(input.SkipCount).Take(input.MaxResultCount);

//            var persons = await query.ToListAsync();

//            return new PagedResultDto<PersonDto>
//            {
//                TotalCount = totalCount,
//                Items = ObjectMapper.Map<List<PersonDto>>(persons)
//            };
//        }

//        public async Task<PersonDto> CreatePersonAsync(CreatePersonDto input)
//        {
//            // Validate email uniqueness
//            var existingPerson = await _personRepository
//                .GetAll()
//                .FirstOrDefaultAsync(p => p.Email.ToLower() == input.Email.ToLower());

//            if (existingPerson != null)
//            {
//                throw new UserFriendlyException("Email address is already in use");
//            }

//            // Create new person
//            var person = ObjectMapper.Map<Person>(input);

//            if (input.UserId.HasValue)
//            {
//                var user = await _userManager.GetUserByIdAsync(input.UserId.Value);
//                if (user == null)
//                {
//                    throw new UserFriendlyException("User not found");
//                }
//                person.User = user;
//            }

//            await _personRepository.InsertAsync(person);
//            await CurrentUnitOfWork.SaveChangesAsync();

//            return ObjectMapper.Map<PersonDto>(person);
//        }

//        public async Task<PersonDto> UpdatePersonAsync(UpdatePersonDto input)
//        {
//            var person = await _personRepository.GetAsync(input.Id);

//            // Check if email is changing, and if so, validate it's not in use by another person
//            if (!string.Equals(person.Email, input.Email, StringComparison.OrdinalIgnoreCase))
//            {
//                var existingPerson = await _personRepository
//                    .GetAll()
//                    .FirstOrDefaultAsync(p => p.Email.ToLower() == input.Email.ToLower());

//                if (existingPerson != null && existingPerson.Id != input.Id)
//                {
//                    throw new UserFriendlyException("Email address is already in use");
//                }
//            }

//            // Update properties
//            ObjectMapper.Map(input, person);

//            await _personRepository.UpdateAsync(person);

//            return ObjectMapper.Map<PersonDto>(person);
//        }

//        public async Task DeletePersonAsync(Guid id)
//        {
//            await _personRepository.DeleteAsync(id);
//        }

//        #endregion

//        #region Patient Operations

//        public async Task<PatientDto> GetPatientAsync(Guid id)
//        {
//            var patient = await _patientRepository.GetAsync(id);
//            return ObjectMapper.Map<PatientDto>(patient);
//        }

//        public async Task<PagedResultDto<PatientDto>> GetAllPatientsAsync(GetPatientsInput input)
//        {
//            var query = _patientRepository.GetAll();

//            // Apply filter if provided
//            if (!string.IsNullOrWhiteSpace(input.Filter))
//            {
//                var filter = input.Filter.ToLower();
//                query = query.Where(p =>
//                    p.FirstName.ToLower().Contains(filter) ||
//                    p.LastName.ToLower().Contains(filter) ||
//                    p.Email.ToLower().Contains(filter) ||
//                    p.Address.ToLower().Contains(filter) ||
//                    p.City.ToLower().Contains(filter));
//            }

//            var totalCount = await query.CountAsync();

//            // Apply sorting and paging
//            query = ApplySorting(query, input);
//            query = query.Skip(input.SkipCount).Take(input.MaxResultCount);

//            var patients = await query.ToListAsync();

//            return new PagedResultDto<PatientDto>
//            {
//                TotalCount = totalCount,
//                Items = ObjectMapper.Map<List<PatientDto>>(patients)
//            };
//        }

//        public async Task<PatientDto> CreatePatientAsync(CreatePatientDto input)
//        {
//            // Validate email uniqueness
//            var existingPerson = await _personRepository
//                .GetAll()
//                .FirstOrDefaultAsync(p => p.Email.ToLower() == input.Email.ToLower());

//            if (existingPerson != null)
//            {
//                throw new UserFriendlyException("Email address is already in use");
//            }

//            // Create new patient
//            var patient = ObjectMapper.Map<Patient>(input);

//            if (input.UserId.HasValue)
//            {
//                var user = await _userManager.GetUserByIdAsync(input.UserId.Value);
//                if (user == null)
//                {
//                    throw new UserFriendlyException("User not found");
//                }
//                patient.User = user;
//            }

//            await _patientRepository.InsertAsync(patient);

//            return ObjectMapper.Map<PatientDto>(patient);
//        }

//        public async Task<PatientDto> UpdatePatientAsync(UpdatePatientDto input)
//        {
//            var patient = await _patientRepository.GetAsync(input.Id);

//            // Check if email is changing, and if so, validate it's not in use by another person
//            if (!string.Equals(patient.Email, input.Email, StringComparison.OrdinalIgnoreCase))
//            {
//                var existingPerson = await _personRepository
//                    .GetAll()
//                    .FirstOrDefaultAsync(p => p.Email.ToLower() == input.Email.ToLower());

//                if (existingPerson != null && existingPerson.Id != input.Id)
//                {
//                    throw new UserFriendlyException("Email address is already in use");
//                }
//            }

//            // Update properties
//            ObjectMapper.Map(input, patient);

//            await _patientRepository.UpdateAsync(patient);

//            return ObjectMapper.Map<PatientDto>(patient);
//        }

//        public async Task DeletePatientAsync(Guid id)
//        {
//            await _patientRepository.DeleteAsync(id);
//        }

//        #endregion

//        #region Provider Operations

//        public async Task<ProviderDto> GetProviderAsync(Guid id)
//        {
//            var provider = await _providerRepository.GetAsync(id);
//            return ObjectMapper.Map<ProviderDto>(provider);
//        }

//        public async Task<PagedResultDto<ProviderDto>> GetAllProvidersAsync(GetProvidersInput input)
//        {
//            var query = _providerRepository.GetAll();

//            // Apply filter if provided
//            if (!string.IsNullOrWhiteSpace(input.Filter))
//            {
//                var filter = input.Filter.ToLower();
//                query = query.Where(p =>
//                    p.FirstName.ToLower().Contains(filter) ||
//                    p.LastName.ToLower().Contains(filter) ||
//                    p.Email.ToLower().Contains(filter) ||
//                    p.Title.ToLower().Contains(filter) ||
//                    p.Qualification.ToLower().Contains(filter) ||
//                    p.Biography.ToLower().Contains(filter));
//            }

//            var totalCount = await query.CountAsync();

//            // Apply sorting and paging
//            query = ApplySorting(query, input);
//            query = query.Skip(input.SkipCount).Take(input.MaxResultCount);

//            var providers = await query.ToListAsync();

//            return new PagedResultDto<ProviderDto>
//            {
//                TotalCount = totalCount,
//                Items = ObjectMapper.Map<List<ProviderDto>>(providers)
//            };
//        }

//        public async Task<ProviderDto> CreateProviderAsync(CreateProviderDto input)
//        {
//            // Validate email uniqueness
//            var existingPerson = await _personRepository
//                .GetAll()
//                .FirstOrDefaultAsync(p => p.Email.ToLower() == input.Email.ToLower());

//            if (existingPerson != null)
//            {
//                throw new UserFriendlyException("Email address is already in use");
//            }

//            // Create new provider
//            var provider = ObjectMapper.Map<Provider>(input);

//            if (input.UserId.HasValue)
//            {
//                var user = await _userManager.GetUserByIdAsync(input.UserId.Value);
//                if (user == null)
//                {
//                    throw new UserFriendlyException("User not found");
//                }
//                provider.User = user;
//            }

//            await _providerRepository.InsertAsync(provider);

//            return ObjectMapper.Map<ProviderDto>(provider);
//        }

//        public async Task<ProviderDto> UpdateProviderAsync(UpdateProviderDto input)
//        {
//            var provider = await _providerRepository.GetAsync(input.Id);

//            // Check if email is changing, and if so, validate it's not in use by another person
//            if (!string.Equals(provider.Email, input.Email, StringComparison.OrdinalIgnoreCase))
//            {
//                var existingPerson = await _personRepository
//                    .GetAll()
//                    .FirstOrDefaultAsync(p => p.Email.ToLower() == input.Email.ToLower());

//                if (existingPerson != null && existingPerson.Id != input.Id)
//                {
//                    throw new UserFriendlyException("Email address is already in use");
//                }
//            }

//            // Update properties
//            ObjectMapper.Map(input, provider);

//            await _providerRepository.UpdateAsync(provider);

//            return ObjectMapper.Map<ProviderDto>(provider);
//        }

//        public async Task DeleteProviderAsync(Guid id)
//        {
//            await _providerRepository.DeleteAsync(id);
//        }

//        #endregion

//        #region Helper Methods

//        private IQueryable<T> ApplySorting<T>(IQueryable<T> query, ISortedResultRequest input)
//        {
//            if (string.IsNullOrWhiteSpace(input.Sorting))
//            {
//                // Default sorting - this depends on the type T
//                if (typeof(T) == typeof(Person) || typeof(T).IsSubclassOf(typeof(Person)))
//                {
//                    // Explicitly specify type arguments for OrderBy and ThenBy
//                    return query.OrderBy(e => ((Person)(object)e).LastName)
//                                .ThenBy(e => ((Person)(object)e).FirstName);
//                }
//                return query;
//            }

//            // Apply custom sorting - explicitly use ABP's extension method
//            return System.Linq.Dynamic.Core.DynamicQueryableExtensions.OrderBy(query, input.Sorting);
//        }
//    }
//    #endregion


//}

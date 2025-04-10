//using Abp.Application.Services.Dto;
//using Abp.Application.Services;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using HealthAPP.Services.PatientServices.PatientDto;
//using HealthAPP.Services.PersonServices.PersonDto;


//namespace HealthAPP.Services
//{
//    public interface IPersonManagerAppService : IApplicationService
//    {
//        // Person operations
//        Task<PersonDto> GetPersonAsync(Guid id); // remove 
//        Task<PersonDto> GetPersonByUserIdAsync(long userId);
//        Task<PersonDto> GetPersonByEmailAsync(string email);
//        Task<PagedResultDto<PersonDto>> GetAllPersonsAsync(GetPersonsInput input);
//        Task<PersonDto> CreatePersonAsync(CreatePersonDto input);
//        Task<PersonDto> UpdatePersonAsync(UpdatePersonDto input);
//        Task DeletePersonAsync(Guid id);



//        // Provider operations
//        Task<ProviderDto> GetProviderAsync(Guid id);
//        Task<PagedResultDto<ProviderDto>> GetAllProvidersAsync(GetProvidersInput input);
//        Task<ProviderDto> CreateProviderAsync(CreateProviderDto input);
//        Task<ProviderDto> UpdateProviderAsync(UpdateProviderDto input);
//        Task DeleteProviderAsync(Guid id);
//    }
//}
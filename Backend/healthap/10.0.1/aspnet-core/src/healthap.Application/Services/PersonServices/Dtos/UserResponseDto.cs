using Abp.Application.Services.Dto;

namespace healthap.Services.PersonServices.Dtos
{
        public class UserResponseDto : EntityDto<long>
        {
            public string Name { get; set; }
            public string Surname { get; set; }
            public string EmailAddress { get; set; }
            public string UserName { get; set; }
        }

}

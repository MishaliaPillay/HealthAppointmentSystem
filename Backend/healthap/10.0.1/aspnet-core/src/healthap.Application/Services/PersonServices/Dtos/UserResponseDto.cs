using Abp.Application.Services.Dto;

namespace healthap.Services.PersonServices.Dtos
{
        public class UserResponseDto : EntityDto<long>
        {
            public string FirstName { get; set; }
            public string Surname { get; set; }
            public string Email { get; set; }
            public string PhoneNumber { get; set; }
            public string UserName { get; set; }
        }

}

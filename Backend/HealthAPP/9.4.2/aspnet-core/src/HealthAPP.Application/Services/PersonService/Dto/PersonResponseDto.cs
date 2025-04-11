using System;
using Abp.Application.Services.Dto;

namespace HealthAPP.Services.PersonService.Dto
{
    public class PersonResponseDto: EntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public long UserId { get; set; }
    }
}

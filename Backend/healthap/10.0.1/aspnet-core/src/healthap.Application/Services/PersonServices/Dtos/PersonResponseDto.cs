using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace healthap.Services.PersonServices.Dtos
{
    public class PersonResponseDto : EntityDto<Guid>
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

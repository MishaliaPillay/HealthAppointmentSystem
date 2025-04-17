using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Users.Dto
{
    public class CheckUserExistDto
    {
        public string EmailAddress { get; set; }
        public string UserName { get; set; }
    }
    public class CheckUserExistsResultDto
    {
        public bool EmailExists { get; set; }
        public bool UserNameExists { get; set; }
    }
}

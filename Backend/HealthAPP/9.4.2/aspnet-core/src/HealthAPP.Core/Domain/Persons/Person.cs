using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using HealthAPP.Authorization.Users;

namespace HealthAPP.Domain.Persons
{
    public class Person : FullAuditedEntity<Guid>
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Role { get; set; }

        [ForeignKey("UserId")]
        public long UserId { get; set; }
        public virtual User User { get; set; }


    }
}

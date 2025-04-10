using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthAPP.Services.PersonServices.PersonDto
{
    public class GetPersonsInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}

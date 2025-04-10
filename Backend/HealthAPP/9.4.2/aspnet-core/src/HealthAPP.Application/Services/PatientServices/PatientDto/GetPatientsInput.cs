using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthAPP.Services.PatientServices.PatientDto
{
    public class GetPatientsInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}

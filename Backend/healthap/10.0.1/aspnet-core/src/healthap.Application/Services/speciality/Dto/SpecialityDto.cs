using Abp.AutoMapper;
using healthap.MultiTenancy.speciality;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.speciality.Dto
{
    [AutoMap(typeof(Speciality))]
    public class SpecialityDto
    {
        public string Value { get; set; }
        public string DisplayName { get; set; }
        public int SpecialtyName { get; set; }
    }
}

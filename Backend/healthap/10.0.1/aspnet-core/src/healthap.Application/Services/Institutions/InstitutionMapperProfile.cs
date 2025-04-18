using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using healthap.Domain.Institution;
using healthap.Services.Institutions.Dto;
namespace healthap.Services.Institutions
{
    public class InstitutionMapperProfile : Profile
    {
        public InstitutionMapperProfile()
        {
            CreateMap<Institution, InstitutionListDto>();  // Map Institution to InstitutionListDto
            CreateMap<Institution, InstitutionDto>();      // Map Institution to InstitutionDto
                                                           // Add other mappings as needed
        }
    }
}

using AutoMapper;
using healthap.Domain.Institution;
using healthap.Services.Institutions.Dto;
namespace healthap.Services.Institutions
{
    public class InstitutionMapperProfile : Profile
    {
        public InstitutionMapperProfile()
        {
            CreateMap<Institution, InstitutionListDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
            .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
            .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.State))
            .ForMember(dest => dest.FacilityType, opt => opt.MapFrom(src => src.FacilityType))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));

        }
    }
}

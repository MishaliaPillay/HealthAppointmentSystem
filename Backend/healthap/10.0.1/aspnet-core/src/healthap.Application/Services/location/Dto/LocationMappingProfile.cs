using AutoMapper;
using healthap.Domain.Location;
using healthap.Services.location.Dto;

namespace healthap.Services.location.Dto
{
    public class LocationMappingProfile : Profile
    {
        public LocationMappingProfile()
        {
            CreateMap<Location, LocationDto>()
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.State))
                .ForMember(dest => dest.PostalCode, opt => opt.MapFrom(src => src.PostalCode))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country))
                .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Latitude))
                .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Longitude));
        }
    }
} 
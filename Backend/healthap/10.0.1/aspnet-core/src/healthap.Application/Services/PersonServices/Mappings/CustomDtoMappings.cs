using AutoMapper;
using healthap.Domain.Appointments;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;
using healthap.Services.Helpers;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices.Mappings
{
    class CustomDtoMappings : Profile
    {
        public CustomDtoMappings()
        {

            // User mapping
            CreateMap<Authorization.Users.User, UserResponseDto>();

            // Patient mapping
            CreateMap<PatientRequestDto, Patient>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.User, opt => opt.Ignore())
            .ForMember(d => d.UserId, opt => opt.Ignore());
            CreateMap<Patient, PatientResponseDto>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(p => p.PreferredContactMedthod, m => m.MapFrom(e => e.PreferredContactMedthod != null ? e.PreferredContactMedthod.GetEnumDescription() : null));


            // Provider mapping
            CreateMap<Provider, ProviderResponseDto>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User));

            CreateMap<ProviderRequestDto, Provider>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.User, opt => opt.Ignore())
            .ForMember(d => d.UserId, opt => opt.Ignore());

            CreateMap<Appointment, AppointmentDto>();
            CreateMap<ProviderAvailabilty, ProviderAvailabiltyDto>();

        }


    }
}

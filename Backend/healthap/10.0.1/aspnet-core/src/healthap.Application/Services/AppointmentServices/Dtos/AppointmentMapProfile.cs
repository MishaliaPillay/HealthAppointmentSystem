using AutoMapper;
using healthap.Domain.Appointments;
using healthap.Services.AppointmentServices.Dtos;
using System;

namespace healthap.Services.AppointmentServices.Dtos
{
    public class AppointmentMapProfile : Profile
    {
        public AppointmentMapProfile()
        {
            CreateMap<Appointment, AppointmentDto>()
                .ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.Patient != null ? src.Patient.Id : Guid.Empty))
                .ForMember(dest => dest.ProviderId, opt => opt.MapFrom(src => src.Provider != null ? src.Provider.Id : Guid.Empty));

            CreateMap<AppointmentDto, Appointment>();
        }
    }
}
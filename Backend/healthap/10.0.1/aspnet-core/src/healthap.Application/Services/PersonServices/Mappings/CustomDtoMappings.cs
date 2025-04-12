using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using healthap.Domain.Appointments;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices.Mappings
{
    class CustomDtoMappings : Profile
    {
        public CustomDtoMappings()
        {

            CreateMap<Patient, PatientResponseDto>();
            CreateMap<PatientRequestDto, Patient>()
                .ForMember(d => d.Id, opt => opt.Ignore())
                .ForMember(d => d.User, opt => opt.Ignore())
                .ForMember(d => d.UserId, opt => opt.Ignore());

            CreateMap<Provider, ProviderResponseDto>();

            CreateMap<ProviderRequestDto, Provider>()
                .ForMember(d => d.Id, opt => opt.Ignore())
                .ForMember(d => d.User, opt => opt.Ignore())
                .ForMember(d => d.UserId, opt => opt.Ignore());
            CreateMap<Appointment, AppointmentDto>();
            CreateMap<ProviderAvailabilty, ProviderAvailabiltyDto>();

        }


    }
}

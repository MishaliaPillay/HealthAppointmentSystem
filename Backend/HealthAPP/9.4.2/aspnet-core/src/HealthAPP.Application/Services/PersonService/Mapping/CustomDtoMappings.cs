using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HealthAPP.Domain.Appointments;
using HealthAPP.Domain.Persons;
using HealthAPP.Services.PersonService.Dto;

namespace HealthAPP.Services.PersonService.Mapping
{
    class CustomDtoMappings: Profile
    {
        public CustomDtoMappings()
        {
            CreateMap<Person, PersonResponseDto>();

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

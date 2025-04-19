using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;


namespace healthap.Services.PersonServices.Dtos
{
    [AutoMap(typeof(Provider))]
    public class ProviderResponseDto : EntityDto<Guid>
    {
        public UserResponseDto User { get; set; }
        public string Title { get; set; }
        public string Biography { get; set; }
        public string PhoneNumber { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
        public string Specialty { get; set; }
        public int InstitutionId { get; set; }
        public List<ProviderAvailabiltyDto> ProviderAvailabilty { get; set; }
        public List<ProviderAvailabiltyDto> Availabilities { get; set; }
        public List<AppointmentDto> Appointments { get; set; }

    }
}

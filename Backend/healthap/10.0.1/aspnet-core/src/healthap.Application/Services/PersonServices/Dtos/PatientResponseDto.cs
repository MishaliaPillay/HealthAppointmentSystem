using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.PersonServices.Dtos
{
    [AutoMap(typeof(Patient))]
    public class PatientResponseDto : EntityDto<Guid>
    {

        public UserResponseDto User { get; set; }
        public string Title { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public ReflistConMethod PreferredContactMedthod { get; set; }
        public List<AppointmentDto> Appointments { get; set; }
    }
}

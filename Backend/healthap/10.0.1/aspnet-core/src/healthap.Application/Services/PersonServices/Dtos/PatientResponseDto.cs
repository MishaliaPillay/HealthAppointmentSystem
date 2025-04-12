using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.PersonServices.Dtos
{
    public class PatientResponseDto : EntityDto<Guid>
    {
        public UserReponseDto User { get; set; }
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

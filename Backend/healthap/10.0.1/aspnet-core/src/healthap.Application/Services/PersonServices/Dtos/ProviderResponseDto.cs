using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.PersonServices.Dtos
{
    public class ProviderResponseDto : EntityDto<Guid>
    {
        public UserReponseDto User { get; set; }    
        public string Title { get; set; }
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
        public List<ProviderAvailabiltyDto> Availabilities { get; set; }
        public List<AppointmentDto> Appointments { get; set; }

    }
}

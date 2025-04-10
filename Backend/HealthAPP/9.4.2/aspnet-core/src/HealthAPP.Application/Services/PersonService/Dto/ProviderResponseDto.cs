﻿using System.Collections.Generic;

namespace HealthAPP.Services.PersonService.Dto
{
    public class ProviderResponseDto : ResponsePersonDto
    {
        public string Title { get; set; }
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
        public List<ProviderAvailabiltyDto> Availabilities { get; set; }
        public List<AppointmentDto> Appointments { get; set; }

    }
}

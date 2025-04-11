using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.PersonServices.Dtos
{
    public class ProviderResponseDto : PersonRequestDto
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

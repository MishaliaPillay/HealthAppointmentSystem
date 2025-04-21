using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.PersonServices.Dtos
{
    public class UpdateProviderDto: UserRequestDto
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Biography { get; set; }
        public int? YearsOfExperience { get; set; }
        public int? MaxiumAppointmentsPerDay { get; set; }
        public string? Qualifications { get; set; }
        public string? Speciality { get; set; }
    }
}

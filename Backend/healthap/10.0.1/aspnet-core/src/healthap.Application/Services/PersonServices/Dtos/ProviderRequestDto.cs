using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.PersonServices.Dtos
{
    public class ProviderRequestDto : PersonRequestDto
    {
        //TODO:KM Updated the Title property to the Person class
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
    }
}

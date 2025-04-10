using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HealthAPP.Domain.Appointments
{
    [Keyless]
    public class Appointment
    {

        public DateTime AppointmentDate { get; set; }

    }
}

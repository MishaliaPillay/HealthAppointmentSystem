using System;
using Abp.Application.Services.Dto;
using healthap.Domain.Appointments;
using healthap.Domain.Persons;

namespace healthap.Services.AppointmentServices.Dtos
{
    public class AppointResponseDto:EntityDto<Guid>
    {
        public DateTime AppointmentDate { get; set; }

        public TimeSpan AppointmentTime { get; set; }

        public string Purpose { get; set; }

        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }

        public Provider Provider { get; set; }
        public Patient Patient { get; set; }
    }
}

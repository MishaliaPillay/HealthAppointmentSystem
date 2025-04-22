using System;
using Abp.Application.Services.Dto;
using healthap.Domain.Appointments;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.AppointmentServices.Dtos
{
    public class AppointResponseDto:EntityDto<Guid>
    {

        public DateTime AppointmentDate { get; set; }

        public TimeSpan AppointmentTime { get; set; }

        public string Purpose { get; set; }

        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }

        public Guid ProviderId { get; set; }

        public ProviderResponseDto Provider { get; set; }

        public Guid PatientId { get; set; }
        public PatientResponseDto Patient { get; set; }
    }
}

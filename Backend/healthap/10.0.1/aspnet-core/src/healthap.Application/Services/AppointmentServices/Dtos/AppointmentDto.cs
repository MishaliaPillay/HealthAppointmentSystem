using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using healthap.Domain.Appointments;

namespace healthap.Services.AppointmentServices.Dtos
{
    [AutoMap(typeof(Appointment))]
    public class AppointmentDto : EntityDto<Guid>
    {

        public DateTime AppointmentDate { get; set; }

        public TimeSpan AppointmentTime { get; set; }

        public string Purpose { get; set; }
        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }

        public Guid ProviderId { get; set; }

    }
}

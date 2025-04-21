using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using healthap.Domain.Appointments;

namespace healthap.Services.AppointmentServices.Dtos
{
    [AutoMap(typeof(Appointment))]
    public class AppointmentDto : EntityDto<Guid>
    {
        [Required]
        public DateTime AppointmentDate { get; set; }
        [Required]
        public TimeSpan AppointmentTime { get; set; }
        [Required]
        public string Purpose { get; set; }
        [Required]
        public virtual ReflistAppointStatus? AppointmentStatus { get; set; }
        [Required]
        public Guid ProviderId { get; set; }
        [Required]
        public Guid PatientId { get; set; }

    }
}

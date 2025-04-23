using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using healthap.Domain.Appointments;

namespace healthap.Services.AppointmentServices.Dtos
{
    [AutoMap(typeof(ProviderAvailabilty))]

    public class ProviderAvailabiltyDto:EntityDto<Guid>
    {
        [Required]
        public Guid ProviderId { get; set; }
        [Required]
        public DateTime DateAvailable { get; set; }
        [Required]
        public DayOfWeek DayOfWeek { get; set; }
        [Required]
        public TimeSpan StartTime { get; set; }
        [Required]
        public TimeSpan EndTime { get; set; }
        [Required]
        public bool IsAvailable { get; set; }
    }
}

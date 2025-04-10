using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HealthAPP.Domain.Appointments;

namespace HealthAPP.Sevice.AppointmentService.Dtos
{
    [AutoMap(typeof(Appointment))]
    public class AppointmentDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public DateTime AppointmentDate { get; set; }
        [Required]
        public TimeSpan AppointmentTime { get; set; }
        [Required]
        public string Purpose { get; set; }
    }
}

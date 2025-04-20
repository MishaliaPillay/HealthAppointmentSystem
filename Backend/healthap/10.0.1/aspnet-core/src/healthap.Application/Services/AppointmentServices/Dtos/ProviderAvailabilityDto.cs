using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using healthap.Authorization.Users;
using healthap.Domain.Persons;

namespace healthap.Services.AppointmentServices.Dtos
{
    public class ProviderAvailabilityDto : EntityDto<Guid>
    {
        public Guid ProviderId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsAvailable { get; set; }
        public virtual Provider Provider { get; set; }
    }

}

using System;
using Abp.Domain.Entities.Auditing;
using HealthAPP.Domain.Persons;

namespace HealthAPP.Domain.Appointments
{

    public class ProviderAvailabilty:FullAuditedEntity
    {

        //DayOfWeek:DayOfWeek
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsAvailable { get; set; }
        public virtual Provider Provider { get; set; }
    }
}

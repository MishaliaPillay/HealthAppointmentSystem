using Abp.Domain.Entities.Auditing;
using healthap.Domain.Persons;
using System;

namespace healthap.Domain.Appointments
{
    public class ProviderAvailability : FullAuditedEntity<Guid>
    {
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsAvailable { get; set; }

        public virtual Provider Provider { get; set; }
    }
}

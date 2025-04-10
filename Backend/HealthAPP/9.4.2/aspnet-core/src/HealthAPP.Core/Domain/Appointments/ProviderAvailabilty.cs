using Abp.Domain.Entities.Auditing;
using HealthAPP.Domain.Persons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthAPP.Domain.Appointments
{
    public class ProviderAvailabilty : FullAuditedEntity<Guid>
    {
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsAvailable { get; set; }


        [ForeignKey("ProviderId")]
        public Guid ProviderId { get; set; }
        public virtual Provider Provider { get; set; }
    }
}

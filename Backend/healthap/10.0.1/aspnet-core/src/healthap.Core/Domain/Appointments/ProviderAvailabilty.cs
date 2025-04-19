using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using healthap.Domain.Persons;

namespace healthap.Domain.Appointments
{
    public class ProviderAvailabilty : FullAuditedEntity<Guid>
    {

        //DayOfWeek:DayOfWeek
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsAvailable { get; set; }
        public virtual Provider Provider { get; set; }
    }

}

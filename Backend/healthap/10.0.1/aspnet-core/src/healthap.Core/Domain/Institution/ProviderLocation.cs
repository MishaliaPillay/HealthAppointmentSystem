using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using healthap.Authorization.Users;

namespace healthap.Domain.Institution
{
    public class ProviderLocation : FullAuditedEntity<int>
    {
        public int LocationId { get; set; }
        public long ProviderId { get; set; }
        public string Specialization { get; set; }
        public bool IsActive { get; set; }

        public virtual Institution Institution { get; set; }
        public virtual User Provider { get; set; }
    }

}

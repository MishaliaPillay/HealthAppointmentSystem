using Microsoft.EntityFrameworkCore;

namespace HealthAPP.Domain.Appointments
{
    [Keyless]
    public class NotificationS
    {
        public string Message { get; set; }
    }
}

using System.ComponentModel;

namespace HealthAPP.Domain.Appointments
{
    public enum ReflistAppointStatus
    {
        [Description("Pending")]
        Pending = 1,
        [Description("Confirmed")]
        Confirmed = 2,
        [Description("Completed")]
        Completed = 3,
        [Description("Canceled")]
        Canceled = 4,
        [Description("Noshow")]
        NoShow = 5
    }
}

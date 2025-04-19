using System;
using System.Collections.Generic;

namespace healthap.Domain.Appointments
{
    public class AvailableSlotsOutput
    {
        public List<TimeSpan> AvailableSlots { get; set; }
        public List<TimeSpan> BookedSlots { get; set; }
    }

}

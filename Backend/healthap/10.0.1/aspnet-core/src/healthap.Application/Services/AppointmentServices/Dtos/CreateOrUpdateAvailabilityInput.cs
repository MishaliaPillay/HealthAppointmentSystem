using System;
using System.Collections.Generic;

namespace healthap.Services.AppointmentServices.Dtos
{
    public class CreateOrUpdateAvailabilityInput
    {
        public Guid ProviderId { get; set; }
        public List<DayAvailabilityDto> Availabilities { get; set; }
    }

}

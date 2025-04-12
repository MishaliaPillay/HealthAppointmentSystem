using Abp.Application.Services;
using healthap.Services.location.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.location
{
    /// <summary>
    /// Application service interface for location operations
    /// </summary>
    public interface ILocationAppService : IApplicationService
    {
        /// <summary>
        /// Gets location information based on IP address
        /// </summary>
        /// <param name="input">Input with optional IP address</param>
        /// <returns>Location information</returns>
        Task<LocationDto> GetLocationFromIpAsync(GetLocationFromIpInput input);
    }
}

using System.Threading.Tasks;

namespace healthap.Domain.Location
{
    /// <summary>
    /// Service for retrieving geolocation data from IP addresses
    /// </summary>
    public interface IGeolocationService
    {
        /// <summary>
        /// Get location data from an IP address
        /// </summary>
        /// <param name="ipAddress">The IP address to lookup</param>
        /// <returns>Location data or null if not found</returns>
        Task<Location> GetLocationFromIpAsync(string ipAddress);
        //Task<locationDto> GetLocationFromIpAsync(string ipAddress);
    }
}

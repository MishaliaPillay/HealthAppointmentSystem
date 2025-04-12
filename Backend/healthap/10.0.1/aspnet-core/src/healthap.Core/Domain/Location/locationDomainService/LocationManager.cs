using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace healthap.Domain.Location.locationDomainService
{
    /// <summary>
    /// Domain service for managing location data
    /// </summary>
    public class LocationManager : DomainService
    {
        private readonly IRepository<Location, int> _locationRepository;
        private readonly IGeolocationService _geolocationService;

        public LocationManager(
            IRepository<Location, int> locationRepository,
            IGeolocationService geolocationService)
        {
            _locationRepository = locationRepository;
            _geolocationService = geolocationService;
        }

        /// <summary>
        /// Gets or creates a location from an IP address
        /// </summary>
        /// <param name="ipAddress">The IP address to use for geolocation</param>
        /// <returns>The location or null if unable to determine</returns>
        public async Task<Location> GetOrCreateLocationFromIpAsync(string ipAddress)
        {
            if (string.IsNullOrWhiteSpace(ipAddress))
            {
                throw new UserFriendlyException("IP address cannot be null or empty");
            }

            var stopwatch = Stopwatch.StartNew();

            try
            {
                // Get location data from the IP
                var location = await _geolocationService.GetLocationFromIpAsync(ipAddress);
                if (location == null)
                {
                    Logger.Warn($"Could not determine location from IP: {ipAddress}");
                    throw new UserFriendlyException("Could not determine location from IP address");
                }

                // Check if we already have a matching location in the database
                var existingLocation = await _locationRepository.FirstOrDefaultAsync(l =>
                    l.City == location.City &&
                    l.Country == location.Country &&
                    (l.PostalCode == location.PostalCode || (string.IsNullOrEmpty(l.PostalCode) && string.IsNullOrEmpty(location.PostalCode))));

                if (existingLocation != null)
                {
                    stopwatch.Stop();
                    Logger.Info($"Found existing location for IP: {ipAddress}, ID: {existingLocation.Id} in {stopwatch.ElapsedMilliseconds}ms");
                    return existingLocation;
                }

                // Save to the database
                var result = await _locationRepository.InsertAsync(location);

                stopwatch.Stop();
                Logger.Info($"Created new location for IP: {ipAddress}, ID: {result.Id} in {stopwatch.ElapsedMilliseconds}ms");

                return result;
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                stopwatch.Stop();
                Logger.Error($"Error in GetOrCreateLocationFromIpAsync for IP: {ipAddress} after {stopwatch.ElapsedMilliseconds}ms", ex);
                throw new UserFriendlyException("An error occurred while processing location data");
            }
        }
    }
}

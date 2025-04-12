using Abp.Dependency;
using Abp.Domain.Services;
using Abp.UI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace healthap.Domain.Location
{
    /// <summary>
    /// Implementation of the geolocation service that uses a third-party API to get location data from IP addresses
    /// </summary>
    public class GeolocationService : DomainService, IGeolocationService, ITransientDependency
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _apiKey;
        private readonly string _apiUrl;

        public GeolocationService(
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _apiKey = configuration["GeolocationApi:ApiKey"] ?? "ce626507729fec9a64627894cf760356";
            _apiUrl = configuration["GeolocationApi:Url"] ?? "http://api.ipstack.com";
            
            if (string.IsNullOrEmpty(_apiKey))
            {
                Logger.Warn("No API key found in configuration. Using default key which may not work.");
            }
        }

        /// <summary>
        /// Get location data from an IP address using a third-party geolocation API
        /// </summary>
        public async Task<Location> GetLocationFromIpAsync(string ipAddress)
        {
            if (string.IsNullOrWhiteSpace(ipAddress))
            {
                throw new UserFriendlyException("IP address cannot be null or empty");
            }

            try
            {
                using var httpClient = _httpClientFactory.CreateClient("GeolocationApi");
                var requestUrl = $"{_apiUrl}/{ipAddress}?access_key={_apiKey}";

                Logger.Info($"Requesting geolocation data for IP: {ipAddress} from URL: {requestUrl}");
                var response = await httpClient.GetAsync(requestUrl);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    Logger.Error($"Geolocation API request failed. Status: {response.StatusCode}, Response: {errorContent}");
                    throw new UserFriendlyException($"Failed to get location data: {errorContent}");
                }

                var content = await response.Content.ReadAsStringAsync();
                Logger.Debug($"Received response from geolocation API: {content}");

                var result = JsonSerializer.Deserialize<IpGeolocationResponse>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (result == null)
                {
                    Logger.Error($"Failed to deserialize response for IP: {ipAddress}. Response: {content}");
                    throw new UserFriendlyException("Failed to parse location data");
                }

                // Log the received data for debugging
                Logger.Info($"Received location data - City: {result.City}, Country: {result.CountryName}, Region: {result.RegionName}");

                // Check if we have minimum required data
                if (string.IsNullOrEmpty(result.City) && string.IsNullOrEmpty(result.CountryName))
                {
                    Logger.Error($"Invalid location data received for IP: {ipAddress}. Response: {content}");
                    throw new UserFriendlyException("Could not determine location from IP address");
                }

                // Use defaults for missing data
                var city = string.IsNullOrEmpty(result.City) ? "Unknown" : result.City;
                var country = string.IsNullOrEmpty(result.CountryName) ? "Unknown" : result.CountryName;
                var region = string.IsNullOrEmpty(result.RegionName) ? "Unknown" : result.RegionName;
                var zip = string.IsNullOrEmpty(result.Zip) ? null : result.Zip;

                return new Location(
                    address: $"{city}, {region}",
                    city: city,
                    country: country,
                    state: region,
                    postalCode: zip,
                    latitude: result.Latitude,
                    longitude: result.Longitude
                );
            }
            catch (Exception ex)
            {
                Logger.Error($"Error getting location from IP: {ipAddress}", ex);
                throw new UserFriendlyException($"Failed to get location: {ex.Message}");
            }
        }

        // Class for deserializing the response from the geolocation API
        private class IpGeolocationResponse
        {
            public string Ip { get; set; }
            public string City { get; set; }
            public string RegionName { get; set; }
            public string CountryName { get; set; }
            public string Zip { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
    }
}

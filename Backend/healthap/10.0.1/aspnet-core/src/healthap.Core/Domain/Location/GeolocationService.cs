using Abp.Dependency;
using Abp.Domain.Services;
using Abp.UI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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
        private readonly Dictionary<string, (string Province, string Country)> _saCities;

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

            // Initialize South African cities mapping
            _saCities = new Dictionary<string, (string Province, string Country)>(StringComparer.OrdinalIgnoreCase)
            {
                { "Durban", ("KwaZulu-Natal", "South Africa") },
                { "Johannesburg", ("Gauteng", "South Africa") },
                { "Cape Town", ("Western Cape", "South Africa") },
                { "Pretoria", ("Gauteng", "South Africa") },
                { "Port Elizabeth", ("Eastern Cape", "South Africa") },
                { "Bloemfontein", ("Free State", "South Africa") },
                { "Kimberley", ("Northern Cape", "South Africa") },
                { "Polokwane", ("Limpopo", "South Africa") },
                { "Nelspruit", ("Mpumalanga", "South Africa") },
                { "Pietermaritzburg", ("KwaZulu-Natal", "South Africa") }
            };
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

                // Get city, province, and country
                string city = result.City;
                string province = result.RegionName;
                string country = result.CountryName;

                // If we have a known South African city but missing province/country, use our mapping
                if (!string.IsNullOrEmpty(city) && _saCities.TryGetValue(city, out var saLocation))
                {
                    if (string.IsNullOrEmpty(province) || province == "Unknown")
                    {
                        province = saLocation.Province;
                    }
                    if (string.IsNullOrEmpty(country) || country == "Unknown")
                    {
                        country = saLocation.Country;
                    }
                }

                // Format the address
                var address = FormatAddress(city, province, country, result.Street, result.Number);

                return new Location(
                    address: address,
                    city: city,
                    country: country,
                    state: province,
                    postalCode: result.Zip,
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

        private string FormatAddress(string city, string province, string country, string street, string number)
        {
            var parts = new List<string>();

            if (!string.IsNullOrEmpty(street))
            {
                if (!string.IsNullOrEmpty(number))
                {
                    parts.Add($"{number} {street}");
                }
                else
                {
                    parts.Add(street);
                }
            }

            if (!string.IsNullOrEmpty(city))
            {
                parts.Add(city);
            }

            if (!string.IsNullOrEmpty(province) && province != "Unknown")
            {
                parts.Add(province);
            }

            if (!string.IsNullOrEmpty(country) && country != "Unknown")
            {
                parts.Add(country);
            }

            return string.Join(", ", parts);
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
            public string Street { get; set; }
            public string Number { get; set; }
        }
    }
}

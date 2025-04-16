using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using healthap.Domain.Institution;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace healthap.ExternalServices.GooglePlaces
{
    public class GooglePlacesService : IGooglePlacesService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public GooglePlacesService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient("GooglePlaces");
            _apiKey = configuration["GooglePlaces:ApiKey"];
        }

        public async Task<List<Institution>> SearchHealthcareLocationsAsync(string query, string region = "za")
        {
            try
            {
                var types = "hospital|doctor|dentist|health";
                var url = $"https://maps.googleapis.com/maps/api/place/textsearch/json" +
                          $"?query={Uri.EscapeDataString(query)}" +
                          $"&region={region}" +
                          $"&type={types}" +
                          $"&key={_apiKey}";

                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var placesResponse = JsonConvert.DeserializeObject<PlacesSearchResponse>(content);

                // Limit the number of results to avoid DB overload
                var maxResults = 2;

                return placesResponse.Results
                    .Take(maxResults)
                    .Select(p => new Institution
                    {
                        PlaceId = p.PlaceId,
                        Address = p.FormattedAddress,
                        // Parse out components from formatted address
                        City = ExtractCity(p.FormattedAddress),
                        State = ExtractState(p.FormattedAddress),
                        Country = "South Africa", // Default since we're filtering by region=za
                        FacilityType = DetermineFacilityType(p.Types),
                        Description = p.Name,
                        Latitude = p.Geometry.Location.Lat,
                        Longitude = p.Geometry.Location.Lng,
                        GoogleMapsUrl = $"https://www.google.com/maps/place/?q=place_id:{p.PlaceId}"
                    })
                    .ToList();
            }
            catch (Exception ex)
            {
                // Log exception
                return new List<Institution>();
            }
        }

        public async Task<Institution> GetPlaceDetailsAsync(string placeId)
        {
            try
            {
                var url = $"https://maps.googleapis.com/maps/api/place/details/json" +
                          $"?place_id={placeId}" +
                          $"&fields=name,formatted_address,geometry,type,address_component" +
                          $"&key={_apiKey}";

                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var detailsResponse = JsonConvert.DeserializeObject<PlaceDetailsResponse>(content);
                var result = detailsResponse.Result;

                return new Institution
                {
                    PlaceId = placeId,
                    Address = result.FormattedAddress,
                    City = ExtractAddressComponent(result.AddressComponents, "locality"),
                    State = ExtractAddressComponent(result.AddressComponents, "administrative_area_level_1"),
                    PostalCode = ExtractAddressComponent(result.AddressComponents, "postal_code"),
                    Country = ExtractAddressComponent(result.AddressComponents, "country"),
                    FacilityType = DetermineFacilityType(result.Types),
                    Description = result.Name,
                    Latitude = result.Geometry.Location.Lat,
                    Longitude = result.Geometry.Location.Lng,
                    GoogleMapsUrl = $"https://www.google.com/maps/place/?q=place_id:{placeId}"
                };
            }
            catch (Exception ex)
            {
                // Log exception
                return null;
            }
        }

        private string ExtractCity(string formattedAddress)
        {
            // Simple parsing logic - would need refinement for production
            var parts = formattedAddress.Split(',');
            return parts.Length > 1 ? parts[parts.Length - 3].Trim() : "";
        }

        private string ExtractState(string formattedAddress)
        {
            // Simple parsing logic - would need refinement for production
            var parts = formattedAddress.Split(',');
            return parts.Length > 1 ? parts[parts.Length - 2].Trim() : "";
        }

        private string ExtractAddressComponent(List<AddressComponent> components, string type)
        {
            return components
                .FirstOrDefault(c => c.Types.Contains(type))
                ?.LongName ?? "";
        }

        private string DetermineFacilityType(List<string> types)
        {
            if (types.Contains("hospital")) return "Hospital";
            if (types.Contains("doctor")) return "Doctor's Office";
            if (types.Contains("dentist")) return "Dental Clinic";
            if (types.Contains("health")) return "Healthcare Facility";
            return "Medical Facility";
        }

      
            Task<List<Institution>> IGooglePlacesService.SearchHealthcareInstitutionsAsync(string query, string region)
{
                return SearchHealthcareLocationsAsync(query, region);
            }

       
    }

    // Response models for Google Places API
    public class PlacesSearchResponse
    {
        [JsonProperty("results")]
        public List<PlaceResult> Results { get; set; }
    }

    public class PlaceDetailsResponse
    {
        [JsonProperty("result")]
        public PlaceResult Result { get; set; }
    }

    public class PlaceResult
    {
        [JsonProperty("place_id")]
        public string PlaceId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("formatted_address")]
        public string FormattedAddress { get; set; }

        [JsonProperty("geometry")]
        public Geometry Geometry { get; set; }

        [JsonProperty("types")]
        public List<string> Types { get; set; }

        [JsonProperty("address_components")]
        public List<AddressComponent> AddressComponents { get; set; }
    }

    public class Geometry
    {
        [JsonProperty("location")]
        public Location Location { get; set; }
    }

    public class Location
    {
        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lng")]
        public double Lng { get; set; }
    }

    public class AddressComponent
    {
        [JsonProperty("long_name")]
        public string LongName { get; set; }

        [JsonProperty("short_name")]
        public string ShortName { get; set; }

        [JsonProperty("types")]
        public List<string> Types { get; set; }
    }

}

using Abp.Application.Services;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.UI;
using healthap.Domain.Location;
using healthap.Domain.Location.locationDomainService;
using healthap.Services.location.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace healthap.Services.location
{
    /// <summary>
    /// Application service implementation for location operations
    /// </summary>
    public class LocationAppService : ApplicationService, ILocationAppService
    {
        private readonly LocationManager _locationManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LocationAppService(
            LocationManager locationManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _locationManager = locationManager;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Gets location information based on IP address
        /// If IP address is not provided, the client's IP address will be used
        /// </summary>
        [HttpGet]
        [Route("api/location/ip")]
        // No [AbpAuthorize] attribute since we want this to be accessible without authentication
        public async Task<LocationDto> GetLocationFromIpAsync(GetLocationFromIpInput input)
        {
            try
            {
                string ipAddress = input?.IpAddress;

                if (string.IsNullOrWhiteSpace(ipAddress))
                {
                    ipAddress = GetClientIpAddress();
                }

                if (!IsValidIpAddress(ipAddress))
                {
                    throw new UserFriendlyException("Invalid IP address format");
                }

                var location = await _locationManager.GetOrCreateLocationFromIpAsync(ipAddress);
                
                if (location == null)
                {
                    throw new UserFriendlyException("Could not determine location");
                }

                return ObjectMapper.Map<LocationDto>(location);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error in GetLocationFromIpAsync", ex);
                throw new UserFriendlyException("An error occurred while getting location information");
            }
        }

        /// <summary>
        /// Gets the client's IP address from the request
        /// </summary>
        private string GetClientIpAddress()
        {
            try
            {
                // Try to get IP from X-Forwarded-For header first (for clients behind proxies)
                string ip = _httpContextAccessor.HttpContext.Request.Headers["X-Forwarded-For"].ToString();

                // If not found, get the remote IP
                if (string.IsNullOrEmpty(ip))
                {
                    ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress?.ToString();
                }

                // If still not found (unlikely), use a default
                if (string.IsNullOrEmpty(ip))
                {
                    ip = "127.0.0.1";
                }

                return ip;
            }
            catch (Exception ex)
            {
                Logger.Error("Error getting client IP address", ex);
                return "127.0.0.1";
            }
        }

        private bool IsValidIpAddress(string ipAddress)
        {
            if (string.IsNullOrWhiteSpace(ipAddress))
                return false;

            string[] parts = ipAddress.Split('.');
            if (parts.Length != 4)
                return false;

            foreach (string part in parts)
            {
                if (!int.TryParse(part, out int value) || value < 0 || value > 255)
                    return false;
            }

            return true;
        }
    }
}

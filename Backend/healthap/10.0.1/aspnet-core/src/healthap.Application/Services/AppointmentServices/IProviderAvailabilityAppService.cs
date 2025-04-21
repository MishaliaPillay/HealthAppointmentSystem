using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using healthap.Services.AppointmentServices.Dtos;

namespace healthap.Services.AppointmentServices
{
    public interface IProviderAvailabilityAppService : IApplicationService
    {
        Task<List<ProviderAvailabiltyDto>> GetAvailabilityByProviderIdAsync(Guid providerId);

        Task<ProviderAvailabiltyDto> CreateAvailabilityAsync(ProviderAvailabiltyDto input);

        Task<ProviderAvailabiltyDto> UpdateAvailabilityAsync(ProviderAvailabiltyDto input);
    }
}
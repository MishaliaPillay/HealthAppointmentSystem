using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using healthap.Domain.Appointments;
using healthap.Services.AppointmentServices.Dtos;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.PersonServices
{
    public interface IProviderAppService : IAsyncCrudAppService<
        ProviderResponseDto,
        Guid,
        PagedAndSortedResultRequestDto,
        ProviderRequestDto,
        ProviderResponseDto>
    {
        Task<ProviderResponseDto> CreateAsync(ProviderRequestDto input);


        Task SetProviderAvailabilityAsync(CreateOrUpdateAvailabilityInput input);
        Task<AvailableSlotsOutput> GetAvailableSlotsAsync(Guid providerId, DateTime date);
    }
}

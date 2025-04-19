using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using healthap.Domain.Institution;
using healthap.Domain.Persons;
using healthap.Services.ProviderInstutionService.ProviderInstutionDto;
using Microsoft.EntityFrameworkCore;

namespace healthap.Services.ProviderInstutionService
{
    public class ProviderInstutionAppService : ApplicationService, IProviderInstutionAppService
    {
        private readonly IRepository<Provider, Guid> _providerRepository;
        private readonly IRepository<Institution, int> _institutionRepository;
        //  private readonly IRepository<ProviderAvailabilty, int> _availabilityRepository;

        public ProviderInstutionAppService(
            IRepository<Provider, Guid> providerRepository,
            IRepository<Institution, int> institutionRepository
            //IRepository<ProviderAvailabilty, int> availabilityRepository
            )
        {
            _providerRepository = providerRepository;
            _institutionRepository = institutionRepository;
            // _availabilityRepository = availabilityRepository;

        }
        public async Task<List<InstitutionWithProvidersDto>> GetInstitutionsWithProvidersBySpecialtyAsync(string specialty)
        {
            var providersWithSpecialty = await _providerRepository.GetAll()
                .Include(p => p.User)
                .Include(p => p.Institution)
                .Where(p => p.Specialty == specialty)
                .ToListAsync();

            var groupedByInstitution = providersWithSpecialty
                .GroupBy(p => p.Institution)
                .Select(group => new InstitutionWithProvidersDto
                {
                    InstitutionId = group.Key.Id,
                    InstitutionName = group.Key.Description, // or use a Name field if exists
                    Address = group.Key.Address,
                    Providers = group.Select(p => new ProviderInstutionsDto
                    {
                        UserId = p.UserId,
                        UserName = p.User.UserName,
                        FullName = p.User.FullName,
                        Title = p.Title,
                        Biography = p.Biography,
                        PhoneNumber = p.PhoneNumber,
                        YearsOfExperience = p.YearsOfExperience,
                        MaxAppointmentsPerDay = p.MaxAppointmentsPerDay,
                        Qualification = p.Qualification,
                        Speciality = p.Specialty,
                        InstitutionId = p.InstitutionId,
                    }).ToList()
                }).ToList();

            return groupedByInstitution;
        }

        public async Task<List<ProviderInstutionsDto>> GetProvidersInInstitutionAsync(int institutionId)
        {
            // Checking if institution exists
            var institution = await _institutionRepository.GetAsync(institutionId);
            if (institution == null)
            {
                throw new UserFriendlyException("Institution not found");
            }

            // Query providers by institution ID
            var providers = await _providerRepository.GetAll()
                .Include(p => p.User)
                .Include(p => p.Institution)
                .Where(p => p.Institution.Id == institutionId)
                .Select(p => new ProviderInstutionsDto
                {
                    // Id = p.Id,
                    UserId = p.UserId,
                    UserName = p.User.UserName,
                    FullName = p.User.FullName,
                    Title = p.Title,
                    Biography = p.Biography,
                    PhoneNumber = p.PhoneNumber,
                    YearsOfExperience = p.YearsOfExperience,
                    MaxAppointmentsPerDay = p.MaxAppointmentsPerDay,
                    Qualification = p.Qualification,
                    Speciality = p.Specialty,
                    InstitutionId = p.InstitutionId,
                })
                .ToListAsync();

            return providers;
        }
    }

}

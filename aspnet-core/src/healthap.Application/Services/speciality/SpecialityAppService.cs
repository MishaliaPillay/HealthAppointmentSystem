using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper.Internal.Mappers;
using healthap.MultiTenancy.speciality;
using healthap.Services.speciality.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.speciality
{
    public class SpecialityAppService : ApplicationService, ISpecialityAppService
    {

        private static List<RefistSpecialty> _specialties = Enum.GetValues(typeof(RefistSpecialty))
                                                               .Cast<RefistSpecialty>()
                                                               .ToList();

        public async Task<List<SpecialityDto>> GetAllAsync()
        {
            var list = _specialties.Select(s => new SpecialityDto
            {
                Value = s.ToString(),
                DisplayName = EnumHelper.GetDisplayName(s),
                SpecialtyName = (int)s
            }).ToList();

            return await Task.FromResult(list);
        }

        public async Task<SpecialityDto> GetByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new UserFriendlyException("The specialty name is required. Please provide a valid name.");
            }

            if (Enum.TryParse<RefistSpecialty>(name, true, out var specialty))
            {
                return await Task.FromResult(new SpecialityDto
                {
                    Value = specialty.ToString(),
                    DisplayName = EnumHelper.GetDisplayName(specialty),
                    SpecialtyName = (int)specialty
                });
            }

            var availableSpecialties = string.Join(", ", Enum.GetNames(typeof(RefistSpecialty)));

            throw new UserFriendlyException($"Specialty '{name}' not found. Please ensure the name is spelled correctly. Available options: {availableSpecialties}");
        }
    }
}

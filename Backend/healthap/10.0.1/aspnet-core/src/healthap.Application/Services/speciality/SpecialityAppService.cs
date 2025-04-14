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
        
        private static List<SpecialtyName> _specialties = Enum.GetValues(typeof(SpecialtyName))
                                                               .Cast<SpecialtyName>()
                                                               .ToList();

        public async Task<List<SpecialityDto>> GetAllAsync()
        {
            var list = _specialties.Select(s => new SpecialityDto
            {
                Value = s.ToString(),
                DisplayName = EnumHelper.GetDisplayName(s)
            }).ToList();

            return await Task.FromResult(list);
        }

        public async Task<SpecialityDto> CreateAsync(string name)
        {
            if (Enum.TryParse<SpecialtyName>(name, out var newSpecialty) && !_specialties.Contains(newSpecialty))
            {
                _specialties.Add(newSpecialty);

                return await Task.FromResult(new SpecialityDto
                {
                    Value = newSpecialty.ToString(),
                    DisplayName = EnumHelper.GetDisplayName(newSpecialty)
                });
            }

            throw new UserFriendlyException("Specialty already exists or invalid name.");
        }

        public async Task<SpecialityDto> GetByNameAsync(string name)
        {
            // Try parsing the name into an enum value
            if (Enum.TryParse<SpecialtyName>(name, true, out var specialty))
            {
                return await Task.FromResult(new SpecialityDto
                {
                    Value = specialty.ToString(),  
                    DisplayName = EnumHelper.GetDisplayName(specialty),  
                    SpecialtyName = specialty  
                });
            }

            throw new UserFriendlyException("Specialty not found.");
        }

        public async Task<SpecialityDto> UpdateAsync(string oldName, string newName)
        {
            if (Enum.TryParse<SpecialtyName>(oldName, out var oldVal) &&
                Enum.TryParse<SpecialtyName>(newName, out var newVal))
            {
                var index = _specialties.IndexOf(oldVal);
                if (index >= 0)
                {
                    _specialties[index] = newVal;

                    return await Task.FromResult(new SpecialityDto
                    {
                        Value = newVal.ToString(),
                        DisplayName = EnumHelper.GetDisplayName(newVal)
                    });
                }
            }

            throw new UserFriendlyException("Update failed. Specialty not found or invalid.");
        }

        public async Task<bool> DeleteAsync(string name)
        {
            if (Enum.TryParse<SpecialtyName>(name, out var specialty))
            {
                _specialties.Remove(specialty);
                return await Task.FromResult(true);
            }

            return false;
        }
    }
}

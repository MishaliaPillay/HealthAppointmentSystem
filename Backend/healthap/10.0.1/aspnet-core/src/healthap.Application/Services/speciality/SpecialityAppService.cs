using Abp.Application.Services;
using Abp.Domain.Repositories;
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
        public async Task<List<string>> GetAllSpecialitiesAsync()
        {
            var specialties = Enum.GetNames(typeof(SpecialtyName)).ToList();
            return await Task.FromResult(specialties);
        }
    }
}

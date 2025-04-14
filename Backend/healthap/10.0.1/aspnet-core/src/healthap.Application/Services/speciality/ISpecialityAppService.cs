using Abp.Application.Services;
using healthap.Services.speciality.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.speciality
{
    public interface ISpecialityAppService : IApplicationService
    {
        Task<List<string>> GetAllSpecialitiesAsync();
    }
}

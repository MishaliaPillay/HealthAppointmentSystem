using AutoMapper;
using healthap.Domain.Location;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.Services.location.Dto
{
    public class MappingProfile
    {
        public static void CreateLocationMappings(IMapperConfigurationExpression configuration)
        {
            // Map from Location entity to LocationDto
            configuration.CreateMap<Location, LocationDto>();
        }
    }
}

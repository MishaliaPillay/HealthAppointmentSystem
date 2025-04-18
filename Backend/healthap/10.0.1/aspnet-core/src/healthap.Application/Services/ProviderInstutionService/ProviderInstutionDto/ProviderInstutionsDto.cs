using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using healthap.Domain.Institution;

namespace healthap.Services.ProviderInstutionService.ProviderInstutionDto
{
    [AutoMap(typeof(Institution))]
    public class ProviderInstutionsDto : EntityDto<int>
    {

        public long UserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        public string Biography { get; set; }
        public string PhoneNumber { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
        public string Speciality { get; set; }

      



    }
}

using System;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;

namespace healthap.Services.PersonServices.Dtos
{
    public class ProviderRequestDto : UserRequestDto
    {
        public UserReponseDto User { get; set; }
        public string Title { get; set; }
        public string PhoneNumber { get; set; }
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
    }
}

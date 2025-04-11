using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace HealthAPP.Services.PersonService.Dto
{
    public class PersonRequestDto:EntityDto<Guid>
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public string Title { get; set; }
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
    }
}

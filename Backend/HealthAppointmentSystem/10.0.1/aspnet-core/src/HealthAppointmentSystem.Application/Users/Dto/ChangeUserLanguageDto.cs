using System.ComponentModel.DataAnnotations;

namespace HealthAppointmentSystem.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}
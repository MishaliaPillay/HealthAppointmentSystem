using System.ComponentModel.DataAnnotations;

namespace healthap.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}
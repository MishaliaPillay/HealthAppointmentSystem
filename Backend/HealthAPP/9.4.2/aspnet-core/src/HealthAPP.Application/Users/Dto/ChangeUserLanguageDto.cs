using System.ComponentModel.DataAnnotations;

namespace HealthAPP.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
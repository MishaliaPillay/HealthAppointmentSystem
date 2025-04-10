namespace HealthAPP.Services.PersonService.Dto
{
    public class ProviderRequestDto : PersonRequestDto
    {
        public string Title { get; set; }
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
    }
}

namespace healthap.Services.PersonServices.Dtos
{
    public class ProviderRequestDto : UserRequestDto
    {
        public string Title { get; set; }
        public string PhoneNumber { get; set; }
        public string Biography { get; set; }
        public int YearsOfExperience { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string Qualification { get; set; }
        public string SpecialtyName { get; set; }
        public int InstitutionId { get; set; }
    }
}

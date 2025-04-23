using healthap.Authorization.Users;
using healthap.Domain.Appointments;
using healthap.Domain.Persons;
using healthap.Services.AppointmentServices.Dtos;
using healthap.Services.PersonServices.Dtos;

namespace healthap.Services.AppointmentServices.Mappings
{
    public class AppointmentMapper
    {
        public AppointmentMapper()
        {
        }
        //public AppointmentDto MapAppointment(Appointment input)
        //{
        //    AppointmentDto dto = new AppointmentDto
        //    {
        //        Id = input.Id,
        //        AppointmentDate = input.AppointmentDate,
        //        AppointmentTime = input.AppointmentTime,
        //        Purpose = input.Purpose,
        //        AppointmentStatus = input.AppointmentStatus,
        //        Provider = MapProvider(input.Provider),
        //        Patient = MapPatient(input.Patient)

        //    };

        //    return dto;
        //}

        //    public PatientResponseDto MapPatient(Patient input)
        //    {
        //        PatientResponseDto dto = new PatientResponseDto
        //        {
        //            User = MapUserResponseDto(input.User),
        //            Id = input.Id,
        //            DateOfBirth = input.DateOfBirth,
        //            City = input.City,
        //            Address = input.Address,
        //            PhoneNumber = input.PhoneNumber,
        //            Country = input.Country,
        //            PostalCode = input.PostalCode,
        //            Title = input.Title
        //        };

        //        return dto;
        //    }

        //    public ProviderResponseDto MapProvider(Provider input)
        //    {
        //        ProviderResponseDto dto = new ProviderResponseDto
        //        {
        //            Id = input.Id,
        //            Title = input.Title,
        //            Biography = input.Biography,
        //            PhoneNumber = input.PhoneNumber,
        //            Qualification = input.Qualification,
        //            User = MapUserResponseDto(input.User)
        //        };

        //        return dto;
        //    }

        //    public UserResponseDto MapUserResponseDto(User input)
        //    {
        //        UserResponseDto dto = new UserResponseDto
        //        {
        //            Id = input.Id,
        //            Name = input.Name,
        //            UserName = input.UserName,
        //            EmailAddress = input.EmailAddress,
        //            Surname = input.Surname
        //        };

        //        return dto;
        //    }
        //}
    }
}
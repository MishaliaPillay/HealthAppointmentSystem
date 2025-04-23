using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Moq;
using Xunit;
using Abp.Domain.Repositories;
using healthap.Domain.Appointments;
using healthap.Services.AppointmentServices;
using healthap.Services.AppointmentServices.Dtos;

namespace HealthAp.Tests.Services
{
    public class AppointmentAppServiceTests
    {
        private readonly Mock<IRepository<Appointment, Guid>> _mockAppointmentRepo;
        private readonly Mock<AppointmentManager> _mockAppointmentManager;

        public AppointmentAppServiceTests()
        {
            _mockAppointmentRepo = new Mock<IRepository<Appointment, Guid>>();
            _mockAppointmentManager = new Mock<AppointmentManager>(MockBehavior.Loose, null, null);
        }

        [Fact]
        public void Test_AllAppointmentsWithinRange_ReturnsTrueForAvailability()
        {
            // Arrange
            var startTime = new TimeSpan(10, 0, 0); // 10:00 AM
            var endTime = startTime.Add(TimeSpan.FromHours(1)); // 11:00 AM

            // Create a list with appointments WITHIN the range (9:00 AM to 11:00 AM)
            var appointments = new List<Appointment>
            {
                new Appointment { AppointmentTime = new TimeSpan(9, 30, 0) },
                new Appointment { AppointmentTime = new TimeSpan(10, 30, 0) }
            };

            // Act
            // This mimics the availability check in AppointmentAppService
            bool isAvailable = appointments.All(a =>
                a.AppointmentTime < endTime &&
                a.AppointmentTime > startTime - TimeSpan.FromHours(1)
            );

            // Assert - Both appointments are within range, so isAvailable should be true
            Assert.True(isAvailable);
        }

        [Fact]
        public void Test_AppointmentOutsideRange_ReturnsFalseForAvailability()
        {
            // Arrange
            var startTime = new TimeSpan(10, 0, 0); // 10:00 AM
            var endTime = startTime.Add(TimeSpan.FromHours(1)); // 11:00 AM

            // Create a list with an appointment OUTSIDE the range (9:00 AM to 11:00 AM)
            var appointments = new List<Appointment>
            {
                new Appointment { AppointmentTime = new TimeSpan(8, 30, 0) }, // This is before 9:00 AM
                new Appointment { AppointmentTime = new TimeSpan(10, 30, 0) }  // This is within range
            };

            // Act
            // This mimics the availability check in AppointmentAppService
            bool isAvailable = appointments.All(a =>
                a.AppointmentTime < endTime &&
                a.AppointmentTime > startTime - TimeSpan.FromHours(1)
            );

            // Assert - One appointment is outside range, so isAvailable should be false
            Assert.False(isAvailable);
        }

        [Fact]
        public void Test_EmptyAppointmentList_ReturnsTrueForAvailability()
        {
            // Arrange
            var startTime = new TimeSpan(10, 0, 0);
            var endTime = startTime.Add(TimeSpan.FromHours(1));
            var appointments = new List<Appointment>(); // Empty list

            // Act
            bool isAvailable = appointments.All(a =>
                a.AppointmentTime < endTime &&
                a.AppointmentTime > startTime - TimeSpan.FromHours(1)
            );

            // Assert - Empty list means All() returns true by definition
            Assert.True(isAvailable);
        }
    }
}
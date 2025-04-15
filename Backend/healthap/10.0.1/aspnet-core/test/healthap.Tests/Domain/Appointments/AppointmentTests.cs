using NSubstitute;
using System;
using Xunit;
using healthap.Domain.Appointments;

namespace healthap.Tests.Domain.Appointments
{
    public class AppointmentTests
    {


        public AppointmentTests()
        {

        }

        private Appointment CreateAppointment()
        {
            return new Appointment();
        }

        [Fact]
        public void TestMethod1()
        {
            // Arrange
            var appointment = this.CreateAppointment();

            // Act


            // Assert
            Assert.True(true);
        }
    }
}

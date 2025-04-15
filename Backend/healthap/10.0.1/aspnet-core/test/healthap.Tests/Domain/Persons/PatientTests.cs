using NSubstitute;
using System;
using Xunit;
using healthap.Domain.Persons;

namespace healthap.Tests.Domain.Persons
{
    public class PatientTests
    {


        public PatientTests()
        {

        }

        private Patient CreatePatient()
        {
            return new Patient();
        }

        [Fact]
        public void TestMethod1()
        {
            // Arrange
            var patient = this.CreatePatient();

            // Act

           // Assert
            Assert.True(true);
        }
    }
}

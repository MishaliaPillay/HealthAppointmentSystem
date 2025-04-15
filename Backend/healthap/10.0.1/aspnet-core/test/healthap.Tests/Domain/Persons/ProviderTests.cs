using healthap.Domain.Persons;
using Xunit;

namespace healthap.Tests.Domain.Persons
{
    public class ProviderTests
    {
        public ProviderTests()
        {

        }

        private Provider CreateProvider()
        {
            return new Provider();
        }

        [Fact]
        public void TestMethod1()
        {
            // Arrange
            var provider = this.CreateProvider();

            // Act
            // Assert
            Assert.True(true);
        }
    }
}

using System.Threading.Tasks;
using HealthAPP.Models.TokenAuth;
using HealthAPP.Web.Controllers;
using Shouldly;
using Xunit;

namespace HealthAPP.Web.Tests.Controllers
{
    public class HomeController_Tests: HealthAPPWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}
using System.IO;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace healthap.Services.NotificaServices
{
    public class SmsService
    {
        public static void SendMessage(string cell, string msg)
        {
            // Build configuration
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();

            string accountSid = configuration["Twilio:AccountSid"];
            string authToken = configuration["Twilio:AuthToken"];
            string fromNumber = configuration["Twilio:fromNumber"];

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: msg,
                from: new Twilio.Types.PhoneNumber(fromNumber),
                to: new Twilio.Types.PhoneNumber(cell)

                );
        }

    }
}

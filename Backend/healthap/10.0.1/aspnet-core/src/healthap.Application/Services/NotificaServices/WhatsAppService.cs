using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio.Types;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace healthap.Services.NotificaServices
{
    public class WhatsAppService
    {
        public class SendWhatsapp
        {
            public static void SendMessage(string msg)
            {
                // Build configuration
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .AddEnvironmentVariables()
                    .Build();

                string accountSid = configuration["Twilio:AccountSid"];
                string authToken = configuration["Twilio:AuthToken"];


                TwilioClient.Init(accountSid, authToken);

                var messageOptions = new CreateMessageOptions(
                    new PhoneNumber("whatsapp:+27825185584"))
                {
                    From = new PhoneNumber("whatsapp:+14155238886"),
                    Body = msg
                };

                var message = MessageResource.Create(messageOptions);
                Console.WriteLine(message.Body);
            }
        }
    }
}

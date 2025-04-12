using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace healthap.Services.NotificaServices
{
    public class SmsService
    {
        public static void SendMessage(string cell, string msg)
        {
            string accountSid = "AC5c62df0d54b603eb0e268a03d3188502";
            string authToken = "08bc46f5489c650da3f9e8914976125f";
            string fromNumber = "+15807413538";



            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: msg,
                from: new Twilio.Types.PhoneNumber("+15807413538"),
                to: new Twilio.Types.PhoneNumber(cell)

                );
        }

    }
}

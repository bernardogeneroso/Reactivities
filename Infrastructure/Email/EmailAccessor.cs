using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Email
{
    public class EmailAccessor : IEmailAccessor
    {
        private readonly MailMessage _msg;
        private readonly SmtpClient _smtpClient;
        private readonly ILogger _logger;

        public EmailAccessor(IConfiguration config, ILogger logger)
        {
            var email = config["Email:User"];

            var loginInfo = new NetworkCredential(email, config["Email:Password"]);
            var msg = new MailMessage();
            var smtpClient = new SmtpClient(config["Email:Host"], config["Email:Port"] == "0" ? 587 : int.Parse(config["Email:Port"]));

            _msg = msg;
            _smtpClient = smtpClient;
            _logger = logger;

            _msg.From = new MailAddress(email);
            _msg.IsBodyHtml = true;

            _smtpClient.EnableSsl = true;
            _smtpClient.UseDefaultCredentials = false;
            _smtpClient.Credentials = loginInfo;
        }

        public Task SendEmailAsync(string address, string subject, string message)
        {
            _msg.To.Add(address);
            _msg.Subject = subject;
            _msg.Body = message;

            try
            {
                _smtpClient.SendAsync(_msg, address);

                _smtpClient.SendCompleted += (s, e) =>
                {
                    _smtpClient.Dispose();
                    _msg.Dispose();
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);

                _smtpClient.Dispose();
                _msg.Dispose();

            }

            return Task.CompletedTask;
        }
    }
}
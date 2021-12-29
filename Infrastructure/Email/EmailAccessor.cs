using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using MimeKit.Text;

namespace Infrastructure.Email
{
    public class EmailAccessor : IEmailAccessor
    {

        // private readonly MailMessage _msg;
        // private readonly SmtpClient _smtpClient;

        // public EmailAccessor(IConfiguration config)
        // {
        //     var email = config["Email:User"];

        //     var loginInfo = new NetworkCredential(email, config["Email:Password"]);
        //     var msg = new MailMessage();
        //     var smtpClient = new SmtpClient(config["Email:Host"], config["Email:Port"] == "0" ? 587 : int.Parse(config["Email:Port"]));

        //     _msg = msg;
        //     _smtpClient = smtpClient;

        //     _msg.From = new MailAddress(email);
        //     _msg.IsBodyHtml = true;

        //     _smtpClient.EnableSsl = true;
        //     _smtpClient.UseDefaultCredentials = false;
        //     _smtpClient.Credentials = loginInfo;
        // }

        // public Task SendEmailAsync(string address, string subject, string message)
        // {
        //     _msg.To.Add(address);
        //     _msg.Subject = subject;
        //     _msg.Body = message;


        //     _smtpClient.SendAsync(_msg, address);

        //     _smtpClient.SendCompleted += (s, e) =>
        //     {
        //         _smtpClient.Dispose();
        //         _msg.Dispose();
        //     };


        //     return Task.CompletedTask;
        // }

        private readonly IConfiguration _config;

        public EmailAccessor(IConfiguration config)
        {
            _config = config;
        }


        public Task SendEmailAsync(string address, string subject, string message)
        {
            // Create Message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config["Email:User"]));
            email.To.Add(MailboxAddress.Parse(address));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = message };

            // Send Email
            using var smtp = new SmtpClient();
            smtp.CheckCertificateRevocation = false;
            smtp.Connect(_config["Email:Host"], int.Parse(_config["Email:Port"]), SecureSocketOptions.StartTls);
            smtp.Authenticate(_config["Email:User"], _config["Email:Password"]);
            smtp.Send(email);
            smtp.Disconnect(true);

            return Task.CompletedTask;
        }
    }
}
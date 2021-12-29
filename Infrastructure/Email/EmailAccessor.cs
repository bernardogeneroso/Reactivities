namespace Infrastructure.Email
{
    public class EmailAccessor : IEmailAccessor
    {
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
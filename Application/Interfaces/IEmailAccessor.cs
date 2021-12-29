namespace Application.Interfaces
{
    public interface IEmailAccessor
    {
        Task SendEmailAsync(string address, string subject, string message);
    }
}
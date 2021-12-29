using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEmailAccessor
    {
        Task SendEmailAsync(string address, string subject, string message);
    }
}
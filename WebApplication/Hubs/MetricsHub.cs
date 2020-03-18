using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Metrics;
using System;
using System.Threading.Tasks;

namespace WebApplication.Hubs
{
    public class MetricsHub : Hub
    {
        public Task Hello(string user)
        {
            Console.WriteLine(user);
            return Task.CompletedTask;
        }
    }
}
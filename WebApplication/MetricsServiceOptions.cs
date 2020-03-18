using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace WebApplication
{
    public class MetricsServiceOptions
    {
        public ICollection<string> ProviderNames { get; set; }
    }
}
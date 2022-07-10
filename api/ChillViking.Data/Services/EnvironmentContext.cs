using ChillViking.Data.Constants;

namespace ChillViking.Data.Services;

public interface IEnvironmentContext
{
    string CurrentEnvironment { get; }
}

public class EnvironmentContext : IEnvironmentContext
{
    public string CurrentEnvironment => Environment.GetEnvironmentVariable(EnvironmentKey.CurrentEnvironment) ?? "Unknown";
}

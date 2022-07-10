using ChillViking.Data.Enums;
using ChillViking.Data.Models;
using ChillViking.Data.Services;
using Microsoft.Extensions.Logging;

namespace ChillViking.Data.Repositories;

public interface INavigationRepository
{
    Task<NavigationMenu> GetNavigationMenu(CancellationToken cancellationToken);
}

public class NavigationRepository : INavigationRepository
{
    private readonly IEnvironmentContext _environment;
    private readonly ILogger<NavigationRepository> _logger;

    public NavigationRepository(
        IEnvironmentContext environment,
        ILogger<NavigationRepository> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    public Task<NavigationMenu> GetNavigationMenu(CancellationToken cancellationToken)
    {
        _logger.LogDebug("Getting navigation menu");
        var items = new[]
        {
            new NavigationElement
            {
                Id = "home-nav",
                Route = "/home",
                Title = "Home",
                Type = NavigationType.RouterLink,
            },
            new NavigationElement
            {
                Id = "about-us-nav",
                Route = "/about-us",
                Title = "About Us",
                Type = NavigationType.RouterLink,
            },
        };
        return Task.FromResult(new NavigationMenu
        {
            Items = items,
            CurrentEnvironment = _environment.CurrentEnvironment,
        });
    }
}

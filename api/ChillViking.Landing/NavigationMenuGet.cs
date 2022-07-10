using System.Threading;
using System.Threading.Tasks;
using ChillViking.Data.Repositories;
using ChillViking.Landing.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace ChillViking.Landing;

public class NavigationMenuGet
{
    private readonly INavigationRepository _repo;
    private readonly ILogger<NavigationMenuGet> _logger;

    public NavigationMenuGet(
        INavigationRepository repo,
        ILogger<NavigationMenuGet> logger)
    {
        _repo = repo;
        _logger = logger;
    }

    [FunctionName("NavigationMenuGet")]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "navigation-menu")]
        HttpRequest req,
        CancellationToken cancellationToken = new())
    {
        _logger.LogDebug("Getting navigation menu");
        var navMenu = await _repo.GetNavigationMenu(cancellationToken);

        return new OkObjectResult(navMenu.ToResponse());
    }
}

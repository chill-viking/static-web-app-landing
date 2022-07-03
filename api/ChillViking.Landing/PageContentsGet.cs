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

public class PageContentsGet
{
    private readonly IPageContentsRepository _repo;
    private readonly ILogger<PageContentsGet> _logger;

    public PageContentsGet(
        IPageContentsRepository repo,
        ILogger<PageContentsGet> logger)
    {
        _repo = repo;
        _logger = logger;
    }
    
    [FunctionName("PageContentsGet")]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "page-contents")]
        HttpRequest req,
        CancellationToken cancellationToken = new())
    {
        if (!req.Query.TryGetValue("page-slug", out var pageSlug))
        {
            _logger.LogWarning("Request did not include query parameter 'page-slug'");
            pageSlug = "home";
        }

        var pageData = await _repo.GetPageContentsAsync(pageSlug, cancellationToken);
        return new OkObjectResult(pageData.ToResponse());
    }
}

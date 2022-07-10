using ChillViking.Data.Models;
using ChillViking.Data.Services;
using Microsoft.Extensions.Logging;

namespace ChillViking.Data.Repositories;

public interface IPageContentsRepository
{
    Task<PageContents> GetPageContentsAsync(string pageSlug, CancellationToken cancellationToken = default);
}

public class PageContentsRepository : IPageContentsRepository
{
    private readonly IEnvironmentContext _environment;
    private readonly ILogger<PageContentsRepository> _logger;

    public PageContentsRepository(
        IEnvironmentContext environment,
        ILogger<PageContentsRepository> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    public Task<PageContents> GetPageContentsAsync(
        string pageSlug,
        CancellationToken cancellationToken = default)
    {
        _logger.LogDebug("Getting PageContents, {PageSlug}", pageSlug);
        var environment = _environment.CurrentEnvironment;
        var paragraphs = new[]
        {
            new Paragraph
            {
                Id = "p-1",
                Content = $"Viewing this in '{environment}' environment.",
                Class = "environment"
            },
            new Paragraph
            {
                Id = "p-2",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor leo enim. Etiam blandit elit et eros varius, vitae mattis tellus feugiat. Sed at dui sem. Proin vulputate velit eget gravida lobortis. Mauris vitae neque at purus ultrices porta eget et ante. Cras elementum, lorem viverra fermentum posuere, sem ipsum facilisis magna, sit amet mollis odio ex sed sem. Praesent porttitor augue quis enim egestas, vitae rutrum lorem vehicula.",
            },
            new Paragraph
            {
                Id = "p-3",
                Content = "Donec magna purus, ornare non dolor et, sagittis aliquet nisi. Pellentesque sodales hendrerit arcu nec efficitur. Etiam at vestibulum augue. Mauris laoreet elit in pharetra malesuada. Ut sem turpis, commodo quis sodales fermentum, commodo sit amet mauris. Etiam vel lobortis eros, a tempus magna. Quisque commodo nulla gravida, tempor orci et, fermentum lectus. Suspendisse potenti. Cras at velit erat. Duis at leo et metus iaculis pellentesque id ac purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae velit sed ante feugiat congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc interdum gravida ligula, in dictum ex posuere ac. Sed molestie imperdiet ex et elementum. Curabitur lacinia vestibulum lacinia.",
            },
        };
        var title = pageSlug.Equals("home", StringComparison.OrdinalIgnoreCase)
            ? "ChillViking | Home"
            : $"ChillViking | {pageSlug.Replace("-", " ")}";

        return Task.FromResult(new PageContents
        {
            Title = title,
            Divisions = new[]
            {
                new PageDivision
                {
                    Id = "d-1",
                    Content = paragraphs,
                    Class = pageSlug,
                },
            },
        });
    }
}

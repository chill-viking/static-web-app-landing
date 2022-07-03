using System.Threading;
using System.Threading.Tasks;
using ChillViking.Data.Repositories;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace ChillViking.Data.Tests.Repositories;

public class PageContentsRepositoryTests
{
    private PageContentsRepository _implementation = null!;
    private IPageContentsRepository Repo => _implementation;

    [SetUp]
    public void BeforeEach()
    {
        _implementation = new PageContentsRepository(
            Mock.Of<ILogger<PageContentsRepository>>());
    }

    [Test]
    public async Task GetPageDataAsync_Home_ReturnsExpected()
    {
        var result = await Repo.GetPageContentsAsync("home", CancellationToken.None);
        
        Assert.That(result.Title, Is.EqualTo("ChillViking | Home"));
        Assert.That(result.Divisions, Has.One.Items);
    }
}

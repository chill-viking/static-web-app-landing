using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChillViking.Data.Repositories;
using ChillViking.Data.Services;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace ChillViking.Data.Tests.Repositories;

public class PageContentsRepositoryTests
{
    private Mock<IEnvironmentContext> _environmentContextMock = null!;

    private PageContentsRepository _implementation = null!;
    private IPageContentsRepository Repo => _implementation;

    [SetUp]
    public void BeforeEach()
    {
        _environmentContextMock = new Mock<IEnvironmentContext>();
        _environmentContextMock.SetupGet(m => m.CurrentEnvironment)
            .Returns("TestingPageContents");

        _implementation = new PageContentsRepository(
            _environmentContextMock.Object,
            Mock.Of<ILogger<PageContentsRepository>>());
    }

    [Test]
    public async Task GetPageDataAsync_Home_ReturnsExpected()
    {
        var result = await Repo.GetPageContentsAsync("home", CancellationToken.None);

        Assert.That(result.Title, Is.EqualTo("ChillViking | Home"));
        Assert.That(result.Divisions, Has.One.Items);
        Assert.That(result.Divisions.First().Content.First().Content, Contains.Substring("TestingPageContents"));
    }
}

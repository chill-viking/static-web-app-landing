using System.Threading;
using System.Threading.Tasks;
using ChillViking.Data.Enums;
using ChillViking.Data.Repositories;
using ChillViking.Data.Services;
using ChillViking.Testing.NUnit;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace ChillViking.Data.Tests.Repositories;

public class NavigationMenuTests
{
    private Mock<IEnvironmentContext> _environmentContextMock = null!;

    private NavigationRepository _implementation = null!;
    private INavigationRepository Repo => _implementation;

    [SetUp]
    public void BeforeEach()
    {
        _environmentContextMock = new Mock<IEnvironmentContext>();
        _environmentContextMock.SetupGet(m => m.CurrentEnvironment)
            .Returns("TestingNav");

        _implementation = new NavigationRepository(
            _environmentContextMock.Object,
            Mock.Of<ILogger<NavigationRepository>>());
    }

    [Test]
    public async Task GetNavigationMenu_ReturnsExpected()
    {
        var result = await Repo.GetNavigationMenu(CancellationToken.None);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.CurrentEnvironment, Is.EqualTo("TestingNav"));
        result.Items.AssertCollection(
            i =>
            {
                Assert.That(i.Type, Is.EqualTo(NavigationType.RouterLink));
                Assert.That(i.Route, Is.EqualTo("/home"));
                Assert.That(i.Title, Is.EqualTo("Home"));
            },
            i =>
            {
                Assert.That(i.Type, Is.EqualTo(NavigationType.RouterLink));
                Assert.That(i.Route, Is.EqualTo("/about-us"));
                Assert.That(i.Title, Is.EqualTo("About Us"));
            });
    }

}

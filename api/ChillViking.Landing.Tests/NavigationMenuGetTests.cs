using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ChillViking.Data.Models;
using ChillViking.Data.Repositories;
using ChillViking.Landing.Models;
using ChillViking.Testing.NUnit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Moq;
using NUnit.Framework;

namespace ChillViking.Landing.Tests;

public class NavigationMenuGetTests : FunctionTests<NavigationMenuGet>
{
    private Mock<INavigationRepository> _navigationRepoMock = null!;

    private NavigationMenuGet _function = null!;

    [SetUp]
    public void BeforeEach()
    {
        _navigationRepoMock = new Mock<INavigationRepository>();
        _function = new NavigationMenuGet(
            _navigationRepoMock.Object,
            Mock.Of<ILogger<NavigationMenuGet>>());
    }

    [Test]
    public async Task RunAsync_ReturnsExpected()
    {
        var ct = CancellationToken.None;
        var query = new Dictionary<string, StringValues>();
        var repoResponse = new NavigationMenu
        {
            Items = new []
            {
                new NavigationElement
                {
                    Title = "Testing",
                }
            },
            CurrentEnvironment = "TestingNavigationMenuGet",
        };
        _navigationRepoMock
            .Setup(m => m.GetNavigationMenu(It.IsAny<CancellationToken>()))
            .ReturnsAsync(repoResponse);

        var response = await _function.RunAsync(
            HttpRequestSetup(query, string.Empty),
            ct);

        _navigationRepoMock.Verify(m => m.GetNavigationMenu(ct));
        response.AssertToType(out OkObjectResult result);
        result.Value.AssertToType(out FunctionResponse<NavigationMenu> funcResponse);
        Assert.That(funcResponse.Success, Is.True);
        Assert.That(funcResponse.Data, Is.EqualTo(repoResponse));
    }
}

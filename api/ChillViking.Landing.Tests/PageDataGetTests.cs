using System;
using System.Collections.Generic;
using System.Linq;
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

public class PageDataGetTests : FunctionTests
{
    private Mock<IPageContentsRepository> _pageDataRepositoryMock = null!;

    private PageContentsGet _function = null!;

    [SetUp]
    public void BeforeEach()
    {
        Environment.SetEnvironmentVariable("CurrentEnvironment", "Testing");
        _pageDataRepositoryMock = new Mock<IPageContentsRepository>();
        _function = new PageContentsGet(
            _pageDataRepositoryMock.Object,
            Mock.Of<ILogger<PageContentsGet>>());
    }

    [Test]
    public async Task RunAsync_ReturnsExpected()
    {
        var ct = CancellationToken.None;
        var query = new Dictionary<string, StringValues>
        {
            ["page-slug"] = "hello-world",
        };
        var repoResponse = new PageContents
        {
            Divisions = Enumerable.Empty<PageDivision>(),
            Title = "mocked page",
        };
        _pageDataRepositoryMock
            .Setup(m => m.GetPageContentsAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(repoResponse);
        
        var response = await _function.RunAsync(
            HttpRequestSetup(query, string.Empty),
            ct);

        _pageDataRepositoryMock.Verify(m => m.GetPageContentsAsync("hello-world", ct));
        response.AssertToType(out OkObjectResult result);
        result.Value.AssertToType(out FunctionResponse<PageContents> funcResponse);
        Assert.That(funcResponse.Success, Is.True);
        Assert.That(funcResponse.Data, Is.EqualTo(repoResponse));
    }

    [Test]
    public async Task RunAsync_NoQuery_UsesHome()
    {
        
        var ct = CancellationToken.None;
        var query = new Dictionary<string, StringValues>();
        var repoResponse = new PageContents
        {
            Divisions = Enumerable.Empty<PageDivision>(),
            Title = "mocked page",
        };
        _pageDataRepositoryMock
            .Setup(m => m.GetPageContentsAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(repoResponse);
        
        var response = await _function.RunAsync(
            HttpRequestSetup(query, string.Empty),
            ct);

        _pageDataRepositoryMock.Verify(m => m.GetPageContentsAsync("home", ct));
    }
}

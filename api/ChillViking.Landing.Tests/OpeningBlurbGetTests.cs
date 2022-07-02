using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChillViking.Landing.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Moq;
using NUnit.Framework;

namespace ChillViking.Landing.Tests;

public class OpeningBlurbGetTests
{
    private HttpRequest HttpRequestSetup(Dictionary<String, StringValues> query, string body)
    {
        var reqMock = new Mock<HttpRequest>();

        reqMock.Setup(req => req.Query).Returns(new QueryCollection(query));
        var stream = new MemoryStream();
        var writer = new StreamWriter(stream);
        writer.Write(body);
        writer.Flush();
        stream.Position = 0;
        reqMock.Setup(req => req.Body).Returns(stream);
        return reqMock.Object;
    }

    [SetUp]
    public void Setup()
    {
        Environment.SetEnvironmentVariable("CurrentEnvironment", "Testing");
    }

    [Test]
    public async Task RunAsync_ReturnsExpected()
    {
        var response = await OpeningBlurbGet.RunAsync(
            HttpRequestSetup(new Dictionary<string, StringValues>(), string.Empty),
            Mock.Of<ILogger>(),
            CancellationToken.None);

        Assert.That(response, Is.TypeOf<OkObjectResult>());
        var result = (OkObjectResult) response;
        Assert.That(result.Value, Is.TypeOf<Response<Paragraph[]>>());
        var paragraphs = ((Response<Paragraph[]>) result.Value).Data;
        Assert.That(paragraphs.First().Content, Contains.Substring("Testing"));
    }
}

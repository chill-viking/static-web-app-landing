using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FluentAssertions.Execution;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Primitives;
using Moq;
using NUnit.Framework;
using BindingFlags = System.Reflection.BindingFlags;

namespace ChillViking.Landing.Tests;

public abstract class FunctionTests<TFunctionClass>
{
    protected static HttpRequest HttpRequestSetup(Dictionary<string, StringValues> query, string body)
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

    [Test]
    public void IsConfigured()
    {
        var startup = new Startup();
        var host = new HostBuilder()
            .ConfigureWebJobs(startup.Configure)
            .Build();

        using var scope = new AssertionScope();
        var type = typeof(TFunctionClass);
        var constructorInfos = type.GetConstructors(BindingFlags.Public | BindingFlags.Instance);
        Assert.That(constructorInfos, Has.One.Items, "Expect single public constructor");
        var info = constructorInfos.First();
        var exceptions = new List<AssertionException>();
        foreach (var parameter in info.GetParameters())
        {
            try
            {
                host.Services.GetRequiredService(parameter.ParameterType);
            }
            catch (Exception e)
            {
                exceptions.Add(
                    new AssertionException(
                        string.Join(
                            Environment.NewLine,
                            $"Should be able to get constructor parameter <{parameter.ParameterType.Name}> from services",
                            e.Message,
                            e.InnerException != null ? $"Inner Exception: {e.InnerException.Message}" : string.Empty),
                        e));
            }
        }

        if (!exceptions.Any())
            return;

        var messages = exceptions.Select(e => e.Message)
            .Prepend($"Unable to get services to construct {typeof(TFunctionClass).Name}");
        throw new AssertionException(
            string.Join($"{Environment.NewLine}{Environment.NewLine}", messages),
            new AggregateException(exceptions));
    }
}

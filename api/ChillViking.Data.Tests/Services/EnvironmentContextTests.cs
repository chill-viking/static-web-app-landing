using System;
using ChillViking.Data.Constants;
using ChillViking.Data.Services;
using NUnit.Framework;

namespace ChillViking.Data.Tests.Services;

public class EnvironmentContextTests
{
    private readonly IEnvironmentContext _context = new EnvironmentContext();

    [Test]
    public void CurrentEnvironment_GetsCurrentEnvironmentSetting()
    {
        Environment.SetEnvironmentVariable(EnvironmentKey.CurrentEnvironment, "Testing");

        var result = _context.CurrentEnvironment;

        Assert.That(result, Is.EqualTo("Testing"));
    }

    [Test]
    public void CurrentEnvironment_VariableNotSet_ReturnsUnknown()
    {
        Environment.SetEnvironmentVariable(EnvironmentKey.CurrentEnvironment, null);

        var result = _context.CurrentEnvironment;

        Assert.That(result, Is.EqualTo("Unknown"));
    }
}

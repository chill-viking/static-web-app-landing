using System;
using System.Threading;
using System.Threading.Tasks;
using ChillViking.Landing.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace ChillViking.Landing;

public static class OpeningBlurbGet
{
    [FunctionName("OpeningBlurbGet")]
    public static Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "opening-blurb")]
        HttpRequest req,
        ILogger log,
        CancellationToken cancellationToken = new())
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        var environment = Environment.GetEnvironmentVariable("CurrentEnvironment");
        var paragraphs = new[]
        {
            new Paragraph($"Viewing this in '{environment}' environment.", "environment"),
            new Paragraph(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor leo enim. Etiam blandit elit et eros varius, vitae mattis tellus feugiat. Sed at dui sem. Proin vulputate velit eget gravida lobortis. Mauris vitae neque at purus ultrices porta eget et ante. Cras elementum, lorem viverra fermentum posuere, sem ipsum facilisis magna, sit amet mollis odio ex sed sem. Praesent porttitor augue quis enim egestas, vitae rutrum lorem vehicula."),
            new Paragraph(
                "Donec magna purus, ornare non dolor et, sagittis aliquet nisi. Pellentesque sodales hendrerit arcu nec efficitur. Etiam at vestibulum augue. Mauris laoreet elit in pharetra malesuada. Ut sem turpis, commodo quis sodales fermentum, commodo sit amet mauris. Etiam vel lobortis eros, a tempus magna. Quisque commodo nulla gravida, tempor orci et, fermentum lectus. Suspendisse potenti. Cras at velit erat. Duis at leo et metus iaculis pellentesque id ac purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae velit sed ante feugiat congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc interdum gravida ligula, in dictum ex posuere ac. Sed molestie imperdiet ex et elementum. Curabitur lacinia vestibulum lacinia."),
        };
        return Task.FromResult<IActionResult>(new OkObjectResult(paragraphs.ToResponse()));
    }
}

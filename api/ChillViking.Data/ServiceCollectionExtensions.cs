using ChillViking.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ChillViking.Data;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddChillVikingData(this IServiceCollection services)
    {
        services.AddSingleton<IPageContentsRepository, PageContentsRepository>();

        return services;
    }
}

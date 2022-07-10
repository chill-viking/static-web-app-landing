using ChillViking.Data.Repositories;
using ChillViking.Data.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ChillViking.Data;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddChillVikingData(this IServiceCollection services)
    {
        services.AddSingleton<IEnvironmentContext, EnvironmentContext>();

        services.AddSingleton<INavigationRepository, NavigationRepository>();
        services.AddSingleton<IPageContentsRepository, PageContentsRepository>();

        return services;
    }
}

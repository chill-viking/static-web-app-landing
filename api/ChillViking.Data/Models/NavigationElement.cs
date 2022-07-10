using ChillViking.Data.Enums;

namespace ChillViking.Data.Models;

public record NavigationElement
{
    public string Id { get; init; } = string.Empty;
    public NavigationType Type { get; init; }
    public string Route { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
}
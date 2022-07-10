namespace ChillViking.Data.Models;

public record NavigationMenu
{
    public NavigationMenu()
    { }

    public NavigationMenu(IEnumerable<NavigationElement> items, string currentEnvironment) : this()
    {
        CurrentEnvironment = currentEnvironment;
        Items = items.ToArray();
    }

    public IEnumerable<NavigationElement> Items { get; init; } = Enumerable.Empty<NavigationElement>();
    public string CurrentEnvironment { get; init; } = string.Empty;
}

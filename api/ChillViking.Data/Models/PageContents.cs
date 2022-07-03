namespace ChillViking.Data.Models;

public record PageContents
{
    public string Title { get; init; } = null!;
    public IEnumerable<PageDivision> Divisions { get; init; } = null!;
}

namespace ChillViking.Data.Models;

public record PageDivision : ContentWithMetaData, IPageContentMetaData
{
    public IEnumerable<IDivisionContent> Content { get; init; } = null!;

    public PageDivision()
    {
        Class ??= "div-it";
    }
}

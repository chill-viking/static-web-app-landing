using ChillViking.Data.Enums;

namespace ChillViking.Data.Models;

public record PageDivision : ContentWithMetaData, IPageContentMetaData
{
    public DivisionType Type { get; } = DivisionType.Div;
    public IEnumerable<IDivisionContent> Content { get; init; } = null!;

    public PageDivision()
    {
        Class ??= "div-it";
    }
}

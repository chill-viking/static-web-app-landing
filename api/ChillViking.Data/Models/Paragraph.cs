using ChillViking.Data.Enums;

namespace ChillViking.Data.Models;

public record Paragraph : ContentWithMetaData, IDivisionContent
{
    public DivContentType ContentType => DivContentType.Paragraph;
    public string Content { get; init; } = null!;

    public Paragraph()
    {
        Class ??= "content";
    }
}

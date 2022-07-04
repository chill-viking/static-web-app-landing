using ChillViking.Data.Enums;

namespace ChillViking.Data.Models;

public interface IPageContentMetaData
{
    public string? Id { get; }
    public string? Class { get; }
}

public interface IDivisionContent : IPageContentMetaData
{
    public DivContentType Type { get; }
    public string Content { get; }
}

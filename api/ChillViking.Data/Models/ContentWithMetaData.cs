namespace ChillViking.Data.Models;

public abstract record ContentWithMetaData
{
    public string? Id { get; init; }
    public string? Class { get; init; }
}

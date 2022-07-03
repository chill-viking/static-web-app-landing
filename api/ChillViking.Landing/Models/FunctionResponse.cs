namespace ChillViking.Landing.Models;

public record FunctionResponse<T>
{
    public bool Success { get; init; }

    public T Data { get; init; }
}

public static class ResponseExtensions
{
    public static FunctionResponse<T> ToResponse<T>(this T data) => new()
    {
        Success = data != null,
        Data = data,
    };
}

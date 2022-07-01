namespace ChillViking.Landing.Models;

public class Response<T>
{
    public T Data { get; set; }
}

public static class ResponseExtensions
{
    public static Response<T> ToResponse<T>(this T data) => new()
    {
        Data = data,
    };
}

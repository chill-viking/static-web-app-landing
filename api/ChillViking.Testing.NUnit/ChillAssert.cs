using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using FluentAssertions;
using FluentAssertions.Execution;
using NUnit.Framework;

namespace ChillViking.Testing.NUnit;

public static class ChillAssert
{
    private static string GetTypeName(Type type)
    {
        // may need to include other variations in future.
        if (!type.IsGenericType)
            return type.Name;

        var genericParameters = type.GenericTypeArguments.Select(GetTypeName).ToArray();
        return $"{type.Name.Replace($"`{genericParameters.Length}", string.Empty)}<{string.Join(", ", genericParameters)}>";
    }

    /// <summary>
    /// Assert actual value derived from <typeparamref name="TActual"/> is actually <typeparamref name="TType"/>
    /// and set it into <paramref name="result"/>
    /// </summary>
    /// <param name="actual">Value to assert</param>
    /// <param name="result">will be assigned <paramref name="actual"/> as <typeparamref name="TType"></typeparamref></param>
    /// <param name="actualName"></param>
    /// <typeparam name="TType">Derived type of <typeparamref name="TActual"/></typeparam>
    /// <typeparam name="TActual">Current type of <paramref name="actual"/></typeparam>
    /// <returns>true when assert is successful</returns>
    ///
    public static void AssertToType<TActual, TType>(
        this TActual actual,
        out TType result,
        [CallerArgumentExpression("actual")] string? actualName = null) where TType : TActual
    {
        try
        {
            Assert.That(actual, Is.Not.Null.And.TypeOf(typeof(TType)));
            result = (TType) actual!;
        }
        catch (Exception e)
        {
            throw new AssertionException(
                string.Join(
                    " ",
                    $"Failed to confirm '{actualName} as {GetTypeName(typeof(TActual))}'",
                    $"is <{GetTypeName(typeof(TType))}>.{Environment.NewLine}{e.Message}"),
                e);
        }
    }

    /// <summary>
    /// Assert a collection of elements using passed in assertions for each element.
    /// Will confirm length of <paramref name="items"/> matches <paramref name="assertions"/> and then loop through each item.
    /// </summary>
    /// <param name="items">Collection to assert</param>
    /// <param name="assertions">Actions to apply to each element in <paramref name="items"/>, use Assert to throw an exception in action</param>
    /// <typeparam name="TActual"></typeparam>
    /// <exception cref="AssertionException">Thrown when assertions fail</exception>
    public static void AssertCollection<TActual>(
        this IEnumerable<TActual> items,
        params Action<TActual>[] assertions)
    {
        try
        {
            using (new AssertionScope())
            {
                var actualItems = items as TActual[] ?? items.ToArray();
                Assert.That(actualItems, Is.Not.Null);
                Assert.That(actualItems, Has.Length.EqualTo(assertions.Length));
                for (var idx = 0; idx < assertions.Length; idx++)
                    assertions[idx].Invoke(actualItems[idx]);
            }
        }
        catch (Exception e)
        {
            throw new AssertionException(
                string.Join(
                    Environment.NewLine,
                    $"Failed to assert collection of <{GetTypeName(typeof(TActual))}>",
                    $"Exception: {e.Message}",
                    e.InnerException != null ? $"Inner Exception: {e.InnerException.Message}" : string.Empty),
                e);
        }
    }
}

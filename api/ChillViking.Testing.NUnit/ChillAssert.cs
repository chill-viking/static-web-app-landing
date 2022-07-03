using System;
using System.Runtime.CompilerServices;
using NUnit.Framework;

namespace ChillViking.Testing.NUnit;

public static class ChillAssert
{
    // TODO: Figure out a way to have 2 generics and only have to specify one and return it... this will have to do for now.
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
    public static bool AssertToType<TActual, TType>(
        this TActual actual,
        out TType result,
        [CallerArgumentExpression("actual")] string? actualName = null) where TType : TActual
    {
        try
        {
            Assert.That(actual, Is.Not.Null.And.TypeOf(typeof(TType)));
            result = (TType) actual!;

            return true;
        }
        catch (Exception e)
        {
            throw new AssertionException(
                $"Failed to confirm '<{typeof(TActual).Name}> {actualName}' is <{typeof(TType).Name}>.{Environment.NewLine}{e.Message}",
                e);
        }
    }
}

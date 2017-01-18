using System;
using System.Collections.Generic;

namespace HalloJoe.Spin
{
    interface ITextPart
    {
        /// <summary>
        /// Choosen string representation
        /// Example: good morning <see cref="ToStructuredString()"/>
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        string ToString();
        /// <summary>
        /// Original string the <see cref="ITextPart"/> was parsed from
        /// Example: {{good|It's} morning|afternoon|evening}
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        string ToStructuredString();

        //List<ITextPart> ToObject();

        /// <summary>
        /// Returns total number of variants that can be possibly produced
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        decimal CountVariants();
        /// <summary>
        /// Returns the minimal number of alternatives of a single part within
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        int CountMinWords();
        /// <summary>
        /// Returns the maximal number of alternatives of a single part within
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        int CountMaxWords();
    }
}

using System;

namespace HalloJoe.Spin
{   
    public static class Extensions
    {
        /// <summary>
        /// Shorthand for generating a random spin result as string only
        /// </summary>
        /// <param name="s"></param>
        /// <param name="rnd"></param>
        /// <returns></returns>
        public static string Spin(this string s, Random rnd = null) => TextSpinner.Spin(s, rnd ?? new Random());
    }
}

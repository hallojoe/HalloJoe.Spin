using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HalloJoe.Spin
{
    /// <summary>
    /// Simple helper that allow counting words within a string
    /// </summary>
    public static class TextHelper
    {
        /// <summary>
        /// Word seperators
        /// </summary>
        private static char[] _seperators => new char[] { ' ', ',', ';', '.', '!', '"', '(', ')', '?' };
        /// <summary>
        /// Counts number of words within a string
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static int WordsCount(string s)
        {
            string[] items = s.Split(_seperators, StringSplitOptions.RemoveEmptyEntries);
            if (items.Any())
                return items.Length;
            return 0;
        }
    }
}

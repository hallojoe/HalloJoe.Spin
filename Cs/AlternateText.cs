using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HalloJoe.Spin
{
    /// <summary>
    /// Represents a textpart which is [random] one among its contained textparts
    /// </summary>
    internal class AlternatedText : List<ITextPart>, ITextPart
    {
        private Random _rnd;
        private ParserConfiguration _cfg;

        /// <summary>
        /// Constructor that take random or create new
        /// </summary>
        public AlternatedText(Random rnd = null, ParserConfiguration cfg = null) 
        {
            _cfg = cfg ?? new ParserConfiguration();
            _rnd = rnd ?? new Random();
        }
        /// <summary>
        /// Result string
        /// </summary>
        /// <returns></returns>
        string ITextPart.ToString()
        {
            if (this.Count == 0)
                return string.Empty;
            int chosedIdx = _rnd.Next(this.Count);
            return this[chosedIdx].ToString();
        }
        /// <summary>
        /// Structured string
        /// </summary>
        /// <returns></returns>
        string ITextPart.ToStructuredString()
        {
            StringBuilder sb = new StringBuilder();
            bool first = true;
            sb.Append(_cfg.Opening);
            foreach (ITextPart el in this)
            {
                if (first) first = false;
                else
                    sb.Append(_cfg.Delimiter);
                sb.Append(el.ToStructuredString());
            }
            sb.Append(_cfg.Closing);
            return sb.ToString();
        }

        //List<ITextPart> ITextPart.ToObject()
        //{
        //    return this;
        //}

        /// <summary>
        /// Count posible variants
        /// </summary>
        /// <returns></returns>
        decimal ITextPart.CountVariants()
        {
            decimal res = 0;
            foreach (ITextPart tp in this)
                res += tp.CountVariants();
            return res;
        }
        /// <summary>
        /// Count minimum words structured string can consist of
        /// </summary>
        /// <returns></returns>
        int ITextPart.CountMinWords() => this.Min(x => x.CountMinWords());
        /// <summary>
        /// Count maximum words structured string can consist of
        /// </summary>
        /// <returns></returns>
        int ITextPart.CountMaxWords() => this.Max(x => x.CountMaxWords());
    }
}

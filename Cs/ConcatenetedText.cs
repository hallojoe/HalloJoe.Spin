using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HalloJoe.Spin
{
    /// <summary>
    /// Represents a textpart which is a concatenation of contained textparts
    /// </summary>
    internal class ConcatenetedText : List<ITextPart>, ITextPart
    {
        string ITextPart.ToString()
        {
            StringBuilder sb = new StringBuilder();
            foreach (ITextPart tp in this)
                sb.Append(tp.ToString());
            return sb.ToString();
        }
        string ITextPart.ToStructuredString()
        {
            StringBuilder sb = new StringBuilder();
            foreach (ITextPart tp in this)
                sb.Append(tp.ToStructuredString());
            return sb.ToString();
        }

        //List<ITextPart> ITextPart.ToObject()
        //{
        //    return this;
        //}

        decimal ITextPart.CountVariants()
        {
            decimal res = 1;
            foreach (ITextPart tp in this)
                res *= tp.CountVariants();
            return res;
        }
        int ITextPart.CountMinWords() => this.Sum(el => el.CountMinWords());
        int ITextPart.CountMaxWords() => this.Sum(el => el.CountMaxWords());
    }
}

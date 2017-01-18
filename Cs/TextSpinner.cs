using System;

namespace HalloJoe.Spin
{
    /// <summary>
    /// text spinner
    /// </summary>
    public class TextSpinner
    {
        // current part
        private ITextPart _part;
        
        // random 
        private Random _rnd;

        ///// <summary>
        ///// spin opening char
        ///// </summary>
        //private char _opening;

        ///// <summary>
        ///// spin closing char
        ///// </summary>
        //private char _closing;

        /// <summary>
        /// parse a piece of text
        /// </summary>
        /// <param name="text"></param>
        /// <param name="startIdx"></param>
        /// <param name="endIdx"></param>
        /// <param name="rnd"></param>
        /// <returns></returns>
        private static ITextPart ParsePart(string text, int startIdx, int endIdx, Random rnd, char opening = '{', char closing = '}', char split = '|')
        {
            AlternatedText at = new AlternatedText(rnd);
            ConcatenetedText ct = new ConcatenetedText();
            //var t = new Random()
            // part of text
            string part = null;

            // amount of unmatched opening brackets
            int balance = 0;

            int i = 0;
            // position of the opening bracket
            int opnIdx = -1;
            for (i = startIdx; i <= endIdx - 1; i++)
            {
                // opening
                if (text[i] == opening)
                {
                    if (balance == 0)
                    {
                        // add to concatenation
                        part = text.Substring(startIdx, i - startIdx);
                        if (!string.IsNullOrEmpty(part))
                            ct.Add(new SimpleText(part));
                        // update starting index
                        startIdx = i + 1;
                        // remember position of the opening bracket
                        opnIdx = i;
                    }
                    balance += 1;
                }
                // delimiter
                else if (text[i] == split && balance == 0)
                {
                    part = text.Substring(startIdx, i - startIdx);                    
                    ct.Add(new SimpleText(part)); // no check for empty string - by design                    
                    at.Add(ct);// add to alternatives
                    ct = new ConcatenetedText();
                    startIdx = i + 1;
                }
                // closing
                else if (text[i] == closing)
                {
                    balance -= 1;
                    if (balance == 0)
                    {
                        // recursively
                        ITextPart innerPart = ParsePart(text, opnIdx + 1, i, rnd);
                        ct.Add(innerPart);
                        // just for a case, not really needed
                        opnIdx = -1;
                        // parsing check
                        startIdx = i + 1;
                    }
                    else if (balance < 0)
                        throw new ArgumentException($"Unexpected { closing } at position { i }");
                }
            }

            // unmatched ?
            if (balance > 0)
                throw new ArgumentException($"{ opening } at position { opnIdx } is unmatched");

            // last part
            part = text.Substring(startIdx, i - startIdx);
            if (!string.IsNullOrEmpty(part))
                ct.Add(new SimpleText(part));

            // were there alternatives ?
            if (at.Count == 0)
                return ct;
            else
                at.Add(ct);

            return at;
        }

        public TextSpinner(string text, Random rnd = null, char opening = '{', char closing = '}', char split = '|')
        {            
            _rnd = rnd ?? new Random();
            _part = ParsePart(text, 0, text.Length, _rnd, opening, closing, split);
        }

        //public TextSpinner(string text, Random rnd)
        //{
        //    _rnd = rnd;
        //    _part = ParsePart(text, 0, text.Length, _rnd);
        //}

        public override string ToString() => _part.ToString();

        public string ToStructuredString() => _part.ToStructuredString();

        public decimal CountVariants() => _part.CountVariants();

        public int CountMinWords() => _part.CountMinWords();

        public int CountMaxWords() => _part.CountMaxWords();

        // convenient for single calls
        public static string Spin(string text, char opening = '{', char closing = '}', char split = '|') => new TextSpinner(text).ToString();

        // convenient for single calls
        public static string Spin(string text, Random rnd, char opening = '{', char closing = '}', char split = '|') => new TextSpinner(text, rnd, opening, closing, split).ToString();

    }
}



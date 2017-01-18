using System;
using System.Text;

namespace HalloJoe.Spin
{
    /// <summary>
    /// Part of text
    /// </summary>
    internal class SimpleText : ITextPart
    {
        protected string _text;
        protected int _wordsCount = -1;
        public SimpleText(string text) { _text = text; }
        public int WordsCount => (_wordsCount == -1) ? TextHelper.WordsCount(_text) : _wordsCount;
        string ITextPart.ToString() => _text;
        string ITextPart.ToStructuredString() => _text;

        //string ITextPart.ToObject() => _text;

        decimal ITextPart.CountVariants() => 1;
        int ITextPart.CountMinWords() => WordsCount;
        int ITextPart.CountMaxWords() => WordsCount;

        static readonly SimpleText Empty = new SimpleText(string.Empty);
    }
}

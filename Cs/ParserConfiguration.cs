using System;

namespace HalloJoe.Spin
{
    class ParserConfiguration
    {
        public Random Random => new Random();
        public string Opening => "{";
        public string Closing => "}";
        public string Delimiter => "|";
    }
}

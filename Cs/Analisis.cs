using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HalloJoe.Spin
{
    class Analisis
    {
        // PatternName: a pattern name should really reflect the meaning of what it is abstracting. It should be simple so that one can refer to it during analysis.
        public string PatternName => "SpinTexter";

        // Intent: the intent aims to describe the goal the pattern is trying to achieve. It should also describe the problem it tries to solve.
        public string Intent => "A tool that takes a text written in a (nested)array'ish syntax aka. spintext, spintax and transforms it to random variations";

        // Motivation: "A scenario that illustrates the problem and how the analysis pattern contributes to the solution in the concrete scenario"[5]
        public string Motivation => "To produce many (human readable)texts from a single source text.";

        // Forces and context: "Discussion of forces and tensions which should be resolved by the analysis pattern"
        public string ForcesAndContext => "Writing this way enables a writer to express a single message in random variations.";

        // Solution: "Description of solution and of the balance of forces achieved by the analysis pattern in the scenario in the motivation section. Includes all relevant structural and behavioural aspects of the analysis pattern."[4]
        public string Solution { get; set; }

        // Consequences: this should emphasise how the goal is achieved by the analysis pattern with its limitation.
        public string Consequences { get; set; }

        // Design: Suggestions of design implementations of this pattern.
        public string Design { get; set; }

        // Known uses: Real world examples of this pattern usage.
        public string KnownUses { get; set; }

    }
}

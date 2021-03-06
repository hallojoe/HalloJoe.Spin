﻿module SpinTexter
{
    export class TextSpinner
    {

        private _part: ITextPart;
        private _rnd: Random;

        constructor(
            text: string,
            config: ParserConfig)
        {
            this._part = TextSpinner.ParsePart(text, 0, text.length, config);
        }

        private static ParsePart(
            text: string,
            startIdx: number,
            endIdx: number,
            config: ParserConfig = new ParserConfig(-1)): ITextPart
        {            

            var at: AlternatedText = new AlternatedText(config.random),
                ct: ConcatenetedText = new ConcatenetedText(),
                part: string = null;
            
            var
                balance: number = 0,    // amount of unmatched opening brackets            
                i: number = 0,          // index of current char            
                opnIdx: number = -1;    // position of the opening bracket

            for (i = startIdx; i <= endIdx - 1; i++)
            {

                // opening
                // =======
                if (text[i] === config.opening) {
                    if (balance == 0) {
                        part = text.substr(startIdx, i - startIdx);
                        if (part !== null && part !== "")
                            ct.push(new SimpleText(part));
                        startIdx = i + 1;
                        opnIdx = i;
                    }
                    balance += 1;
                }
                // delimiter
                // =========
                else if (text[i] === config.delimiter && balance === 0)
                {
                    part = text.substr(startIdx, i - startIdx);
                    ct.push(new SimpleText(part));  // no check for empty string - by design
                    at.push(ct); // add to alternatives
                    ct = new ConcatenetedText();
                    startIdx = i + 1;
                }
                // closing
                // =======
                else if (text[i] === config.closing)
                {                     
                    balance -= 1;
                    if (balance === 0) {
                        var innerPart: ITextPart = TextSpinner.ParsePart(text, opnIdx + 1, i, config);
                        ct.push(innerPart);
                        opnIdx = -1;
                        startIdx = i + 1;
                    }
                    else if (balance < 0)
                        throw "Unexpected " + config.closing + " at position " + i.toString();
                }
            }

            // if positive balance then trow exception
            // =======================================
            if (balance > 0) 
                throw config.opening + " at position " + opnIdx + " is unmatched";

            // get part
            // ========
            part = text.substr(startIdx, i - startIdx);

            // add part to ConcatenatedText
            // ============================
            if (part !== null && part !== "")
                ct.push(new SimpleText(part));

            // were there alternatives ?
            // =========================
            if (at.length === 0)
                return ct;          // return ConcatenatedText
            else at.push(ct);       // push 

            // return
            // ======
            return at;
        }

        public toString(): string
        {
            return this._part.toString();
        }

        public toStructuredString(): string
        {
            return this._part.toStructuredString();
        }

        //public toArrayString(): Array<any>
        //{
        //    return this._part.toArrayString();
        //}

        public countVariants(): number
        {
            return this._part.countVariants();
        }        

        public countMinWords(): number
        {
            return this._part.countMinWords();
        }

        public countMaxWords(): number
        {
            return this._part.countMaxWords();
        }

        public static Spin(text: string, config: ParserConfig = new ParserConfig(-1)): string
        {
            return new TextSpinner(text, config).toString(); 
        }

    }

}
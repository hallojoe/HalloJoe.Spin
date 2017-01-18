module SpinTexter {

    export class AlternatedText extends Array<ITextPart> implements ITextPart {

        private _rnd: Random;

        constructor(rnd: Random) 
        {
            super();
            this._rnd = rnd != null ? rnd : new Random();
        }

        public toString(): string
        {
            if (this.length === 0) return ""; 
            var chosedIdx: number = this._rnd.nextInt(0, this.length -1);
            var result = this[chosedIdx].toString()
            return result;
        } 

        public toStructuredString(): string
        {
            var sb: StringBuilder = new SpinTexter.StringBuilder();
            var first: boolean = true;
            sb.append("{");
            this.forEach(function (el) {
                if (first) first = false;
                else sb.append("|"); 
                sb.append(el.toStructuredString());
            });
            sb.append("}");
            return sb.toString();
        } 

    }
}

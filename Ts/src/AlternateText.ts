module SpinTexter {

    export class AlternatedText extends Array<ITextPart> implements ITextPart {

        private _rnd: Random;
        private _level: number;

        constructor(rnd: Random, level : number = 0) 
        {
            super();
            this._rnd = rnd != null ? rnd : new Random();
            this._level = level;
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
       
        // experimenal, not part of the interface - thinking how to expres shit as json???
        //================================================================================
        public toArrayString(): Array<any> 
        {
            //var sb: StringBuilder = new SpinTexter.StringBuilder();
            //var first: boolean = true;
            //if(this._level === 0)
            //    sb.append("[");
            //else
            //    sb.append("\", [");

            //this.forEach(function (el)
            //{
            //    if (first)
            //    {
            //        sb.append("\"");
            //    }
            //    else
            //        sb.append("\", \"");

            //    sb.append(el.toArrayString());

            //    if (first) {
            //        sb.append("\"");
            //    }

            //    if (first) 
            //        first = false;
                
            //});
            //sb.append("]");
            //return sb.toString();

            return this;

        }

        public countVariants(): number
        {
            //var res: number = 0;
            //this.forEach(function (tp) { res += tp.countVariants(); });
            //return res;
            var res: number = 1;
            this.forEach(function (tp) {
                var counter: number = tp.countVariants();
                if (res < 100100) res += counter;
            });
            return res;
        }

        // todo: make a guy that work for both of these guys...

        public countMinWords(): number {
            var counter = 0;
            this.forEach(function (tp) {                    
                var minWords = tp.countMinWords();
                if (counter === 0)
                    counter = minWords;
                if (minWords < counter)
                    counter = minWords;
            });
            return counter;
        }

        public countMaxWords(): number {
            var counter = 0;
            this.forEach(function (tp) {
                var maxWords = tp.countMinWords();
                if (counter === 0)
                    counter = maxWords;
                if (maxWords > counter)
                    counter = maxWords;
            });
            return counter;
            //return Math.max.apply(null, this);
        }
    }
}

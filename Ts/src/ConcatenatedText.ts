module SpinTexter
{
    export class ConcatenetedText extends Array<ITextPart> implements ITextPart
    {
        toString(): string
        {
            var sb: SpinTexter.StringBuilder = new SpinTexter.StringBuilder();
            this.forEach(function (tp) { sb.append(tp.toString()); });
            return sb.toString();
        }

        toStructuredString(): string {
            var sb: SpinTexter.StringBuilder = new SpinTexter.StringBuilder();
            this.forEach(function (tp) { sb.append(tp.toStructuredString()); });
            return sb.toString();
        }

        countVariants(): number
        {
            let res: number = 1;
            this.forEach(function (tp) { res = res * tp.countVariants(); });
            return res;
            //var res: number = 1;
            //this.forEach(function (tp)
            //{
            //    var counter: number = tp.countVariants();
            //    if (res < counter) res *= counter;
            //});
            //return res;
        }

        countMinWords(): number
        {
            let res: number = 0;
            this.forEach(function (tp) { res = res + tp.countMinWords(); });
            return res;
        }

        countMaxWords(): number
        {
            let res: number = 0;
            this.forEach(function (tp) { res = res + tp.countMaxWords(); });
            return res;
        }

    }
}
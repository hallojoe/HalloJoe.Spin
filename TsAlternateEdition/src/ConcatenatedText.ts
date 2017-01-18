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

    }
}
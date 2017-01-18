module SpinTexter
{
    export interface ITextPart
    {
        toString(): string;
        toStructuredString(): string;
        toArrayString(): Array<any>;
        countVariants(): number;
        countMinWords(): number;
        countMaxWords(): number;
    }
}
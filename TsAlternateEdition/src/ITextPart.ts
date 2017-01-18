module SpinTexter
{
    export interface ITextPart
    {
        toString(): string;
        toStructuredString(): string;
        toStructuredString2(): string;
        countVariants(): number;
        countMinWords(): number;
        countMaxWords(): number;
    }
}
module SpinTexter
{
    export class ParserConfig
    {
        private _seed: number;

        constructor(seed: number = -1)
        {
            this._seed = seed;
        }

        random: Random = new Random(this._seed);
        opening: string = '{';
        closing: string = '}';
        delimiter: string = '|';
    }



    //export class ParserCommand extends ParserConfig {
    //    super();
    //    text: ""
    //}
     

}
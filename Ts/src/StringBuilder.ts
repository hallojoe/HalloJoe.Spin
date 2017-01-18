module SpinTexter
{
    export class StringBuilder
    {
        private _strings : Array<string>;

        constructor(value: string = "")
        {
            this._strings = new Array<string>();
            this.append(value);
        }

        public append = function (value: string)
        {
            if (value) this._strings.push(value);
        }

        public clear = function ()
        {
            this._strings.length = 1;
        }

        public toString = function ()
        {
            return this._strings.join("");
        }
    }
}
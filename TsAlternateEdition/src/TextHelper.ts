
module SpinTexter
{
    /// <summary>
    /// Simple helper that allow counting words within a string
    /// </summary>
    export class TextHelper
    {
        /// <summary>
        /// Word seperators
        /// </summary>
        private static _seperators: string[] = [' ', ',', ';', '.', '!', '"', '(', ')', '?'];

        /// <summary>
        /// Counts number of words within a string
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static WordsCount(s: string)
        {
            var pattern = "[" + this._seperators.join() + "]";
            //console.log(pattern);
            return s.split(new RegExp(pattern, "g")).length;
        }
    }
}

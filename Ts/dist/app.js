var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpinTexter;
(function (SpinTexter) {
    var AlternatedText = (function (_super) {
        __extends(AlternatedText, _super);
        function AlternatedText(rnd, level) {
            if (level === void 0) { level = 0; }
            _super.call(this);
            this._rnd = rnd != null ? rnd : new SpinTexter.Random();
            this._level = level;
        }
        AlternatedText.prototype.toString = function () {
            if (this.length === 0)
                return "";
            var chosedIdx = this._rnd.nextInt(0, this.length - 1);
            var result = this[chosedIdx].toString();
            return result;
        };
        AlternatedText.prototype.toStructuredString = function () {
            var sb = new SpinTexter.StringBuilder();
            var first = true;
            sb.append("{");
            this.forEach(function (el) {
                if (first)
                    first = false;
                else
                    sb.append("|");
                sb.append(el.toStructuredString());
            });
            sb.append("}");
            return sb.toString();
        };
        // experimenal, not part of the interface - thinking how to expres shit as json???
        //================================================================================
        AlternatedText.prototype.toArrayString = function () {
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
        };
        AlternatedText.prototype.countVariants = function () {
            //var res: number = 0;
            //this.forEach(function (tp) { res += tp.countVariants(); });
            //return res;
            var res = 1;
            this.forEach(function (tp) {
                var counter = tp.countVariants();
                if (res < 100100)
                    res += counter;
            });
            return res;
        };
        // todo: make a guy that work for both of these guys...
        AlternatedText.prototype.countMinWords = function () {
            var counter = 0;
            this.forEach(function (tp) {
                var minWords = tp.countMinWords();
                if (counter === 0)
                    counter = minWords;
                if (minWords < counter)
                    counter = minWords;
            });
            return counter;
        };
        AlternatedText.prototype.countMaxWords = function () {
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
        };
        return AlternatedText;
    }(Array));
    SpinTexter.AlternatedText = AlternatedText;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    var ConcatenetedText = (function (_super) {
        __extends(ConcatenetedText, _super);
        function ConcatenetedText() {
            _super.apply(this, arguments);
        }
        ConcatenetedText.prototype.toString = function () {
            var sb = new SpinTexter.StringBuilder();
            this.forEach(function (tp) { sb.append(tp.toString()); });
            return sb.toString();
        };
        ConcatenetedText.prototype.toStructuredString = function () {
            var sb = new SpinTexter.StringBuilder();
            this.forEach(function (tp) { sb.append(tp.toStructuredString()); });
            return sb.toString();
        };
        ConcatenetedText.prototype.toArrayString = function () {
            return this;
        };
        ConcatenetedText.prototype.countVariants = function () {
            //var res: number = 1;
            //this.forEach(function (tp) { res *= tp.countVariants(); });
            //return res;
            var res = 1;
            this.forEach(function (tp) {
                var counter = tp.countVariants();
                if (res < counter)
                    res *= counter;
            });
            return res;
        };
        ConcatenetedText.prototype.countMinWords = function () {
            var res = 1;
            this.forEach(function (tp) { res += tp.countMinWords(); });
            return res;
        };
        ConcatenetedText.prototype.countMaxWords = function () {
            var res = 1;
            this.forEach(function (tp) { res += tp.countMaxWords(); });
            return res;
        };
        return ConcatenetedText;
    }(Array));
    SpinTexter.ConcatenetedText = ConcatenetedText;
})(SpinTexter || (SpinTexter = {}));
//module SpinTexter
//{
//    export class SpinConfig
//    {
//        constructor(
//            random : Random = new Random(),
//            opening : string = '{',
//            closing : string = '}',
//            delimiter : string = '|')
//        {
//        }
//    }
//    export class SpinCommand extends ParserConfig
//    {
//        text: ""
//    }
//}
var SpinTexter;
(function (SpinTexter) {
    var ParserConfig = (function () {
        function ParserConfig(seed) {
            if (seed === void 0) { seed = -1; }
            this.random = new SpinTexter.Random(this._seed);
            this.opening = '{';
            this.closing = '}';
            this.delimiter = '|';
            this._seed = seed;
        }
        return ParserConfig;
    }());
    SpinTexter.ParserConfig = ParserConfig;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    var Random = (function () {
        function Random(seed) {
            if (seed === void 0) { seed = -1; }
            if (seed <= 0)
                seed = Math.floor(Math.random() * 99999) + 11111;
            this.seed = seed;
        }
        Random.prototype.next = function (min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 0; }
            this.seed = (this.seed * 9301 + 49297) % 233281; //changed 233280 to 233281 
            var rnd = this.seed / 233281; // changed 233280 to 233281 
            return min + rnd * (max - min + 1);
        };
        Random.prototype.nextInt = function (min, max) {
            return Math.floor(this.next(min, max)); // changed round to floor
        };
        Random.prototype.nextDouble = function () {
            return this.next(0, 1);
        };
        Random.prototype.pick = function (collection) {
            return collection[this.nextInt(0, collection.length - 1)];
        };
        return Random;
    }());
    SpinTexter.Random = Random;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    var SimpleText = (function () {
        function SimpleText(text) {
            this._wordsCount = -1;
            this._text = text;
        }
        SimpleText.prototype.WordsCount = function () {
            return (this._wordsCount == -1) ? SpinTexter.TextHelper.WordsCount(this._text) : this._wordsCount;
        };
        SimpleText.prototype.toString = function () {
            return this._text;
        };
        SimpleText.prototype.toStructuredString = function () {
            return this._text;
        };
        SimpleText.prototype.toArrayString = function () {
            return [this];
        };
        SimpleText.prototype.countVariants = function () {
            return 1;
        };
        SimpleText.prototype.countMinWords = function () {
            return this.WordsCount();
        };
        SimpleText.prototype.countMaxWords = function () {
            return this.WordsCount();
        };
        SimpleText.Empty = function () {
            return new SimpleText("");
        };
        return SimpleText;
    }());
    SpinTexter.SimpleText = SimpleText;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    var StringBuilder = (function () {
        function StringBuilder(value) {
            if (value === void 0) { value = ""; }
            this.append = function (value) {
                if (value)
                    this._strings.push(value);
            };
            this.clear = function () {
                this._strings.length = 1;
            };
            this.toString = function () {
                return this._strings.join("");
            };
            this._strings = new Array();
            this.append(value);
        }
        return StringBuilder;
    }());
    SpinTexter.StringBuilder = StringBuilder;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    /// <summary>
    /// Simple helper that allow counting words within a string
    /// </summary>
    var TextHelper = (function () {
        function TextHelper() {
        }
        /// <summary>
        /// Counts number of words within a string
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        TextHelper.WordsCount = function (s) {
            var pattern = "[" + this._seperators.join() + "]";
            //console.log(pattern);
            return s.split(new RegExp(pattern, "g")).length;
        };
        /// <summary>
        /// Word seperators
        /// </summary>
        TextHelper._seperators = [' ', ',', ';', '.', '!', '"', '(', ')', '?'];
        return TextHelper;
    }());
    SpinTexter.TextHelper = TextHelper;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    var TextSpinner = (function () {
        function TextSpinner(text, config) {
            if (config === void 0) { config = new SpinTexter.ParserConfig(); }
            this._part = TextSpinner.ParsePart(text, 0, text.length, config);
        }
        TextSpinner.ParsePart = function (text, startIdx, endIdx, config) {
            var at = new SpinTexter.AlternatedText(config.random), ct = new SpinTexter.ConcatenetedText(), part = null;
            var balance = 0, // amount of unmatched opening brackets            
            i = 0, // index of current char            
            opnIdx = -1; // position of the opening bracket
            for (i = startIdx; i <= endIdx - 1; i++) {
                // opening
                // =======
                if (text[i] === config.opening) {
                    if (balance == 0) {
                        part = text.substr(startIdx, i - startIdx);
                        if (part !== null && part !== "")
                            ct.push(new SpinTexter.SimpleText(part));
                        startIdx = i + 1;
                        opnIdx = i;
                    }
                    balance += 1;
                }
                else if (text[i] === config.delimiter && balance === 0) {
                    part = text.substr(startIdx, i - startIdx);
                    ct.push(new SpinTexter.SimpleText(part)); // no check for empty string - by design
                    at.push(ct); // add to alternatives
                    ct = new SpinTexter.ConcatenetedText();
                    startIdx = i + 1;
                }
                else if (text[i] === config.closing) {
                    balance -= 1;
                    if (balance === 0) {
                        var innerPart = TextSpinner.ParsePart(text, opnIdx + 1, i, config);
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
                ct.push(new SpinTexter.SimpleText(part));
            // were there alternatives ?
            // =========================
            if (at.length === 0)
                return ct; // return ConcatenatedText
            else
                at.push(ct); // push 
            // return
            // ======
            return at;
        };
        TextSpinner.prototype.toString = function () {
            return this._part.toString();
        };
        TextSpinner.prototype.toStructuredString = function () {
            return this._part.toStructuredString();
        };
        TextSpinner.prototype.toArrayString = function () {
            return this._part.toArrayString();
        };
        TextSpinner.prototype.countVariants = function () {
            return this._part.countVariants();
        };
        TextSpinner.prototype.countMinWords = function () {
            return this._part.countMinWords();
        };
        TextSpinner.prototype.countMaxWords = function () {
            return this._part.countMaxWords();
        };
        TextSpinner.Spin = function (text, config) {
            return new TextSpinner(text, new SpinTexter.ParserConfig(-1)).toString();
        };
        return TextSpinner;
    }());
    SpinTexter.TextSpinner = TextSpinner;
})(SpinTexter || (SpinTexter = {}));
//# sourceMappingURL=app.js.map
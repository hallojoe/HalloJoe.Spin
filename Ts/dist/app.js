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
            this._rnd = rnd != null ? rnd : new SpinTexter.Random(1000);
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
        AlternatedText.prototype.countVariants = function () {
            var res = 0;
            this.forEach(function (tp) {
                if (res <= 100000)
                    res += tp.countVariants();
            });
            return res;
        };
        AlternatedText.prototype.countMinWords = function () {
            var counter = 0;
            this.forEach(function (tp) {
                var minWords = tp.countMinWords();
                if (counter === 0)
                    counter = minWords;
                if (minWords < counter && minWords > 0)
                    counter = minWords;
            });
            return counter;
        };
        AlternatedText.prototype.countMaxWords = function () {
            var counter = 0;
            this.forEach(function (tp) {
                var maxWords = tp.countMinWords();
                if (maxWords > counter)
                    counter = maxWords;
            });
            return counter;
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
        ConcatenetedText.prototype.countVariants = function () {
            var res = 1;
            this.forEach(function (tp) { res = res * tp.countVariants(); });
            return res;
            //var res: number = 1;
            //this.forEach(function (tp)
            //{
            //    var counter: number = tp.countVariants();
            //    if (res < counter) res *= counter;
            //});
            //return res;
        };
        ConcatenetedText.prototype.countMinWords = function () {
            var res = 0;
            this.forEach(function (tp) { res = res + tp.countMinWords(); });
            return res;
        };
        ConcatenetedText.prototype.countMaxWords = function () {
            var res = 0;
            this.forEach(function (tp) { res = res + tp.countMaxWords(); });
            return res;
        };
        return ConcatenetedText;
    }(Array));
    SpinTexter.ConcatenetedText = ConcatenetedText;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    var ParserConfig = (function () {
        function ParserConfig(seed) {
            if (seed === void 0) { seed = -1; }
            this.opening = '{';
            this.closing = '}';
            this.delimiter = '|';
            if (seed <= 0)
                this.reSeed();
            else
                this._seed = seed;
            this.random = new SpinTexter.Random(this._seed);
        }
        ParserConfig.prototype.reSeed = function () {
            this._seed = Math.floor(Math.random() * 99999) + 11111;
        };
        return ParserConfig;
    }());
    SpinTexter.ParserConfig = ParserConfig;
})(SpinTexter || (SpinTexter = {}));
var SpinTexter;
(function (SpinTexter) {
    var Random = (function () {
        function Random(seed) {
            this._seedStart = seed;
            //if (this._seedStart <= 0) 
            //    this._seedStart = Math.floor(Math.random() * 99999) + 11111;
            this._seed = this._seedStart;
        }
        Random.prototype.next = function (min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 0; }
            this._seed = (this._seedStart * 9301 + 49297) % 233281; //changed 233280 to 233281 
            var rnd = this._seed / 233281; // changed 233280 to 233281 
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
            s = s.trim();
            var pattern = "[" + this.escapeRegExp(this._seperators.join()) + "]";
            var values = s.split(new RegExp(pattern, "g"));
            var result = 0;
            for (var i = 0; i < values.length; i++)
                if (values[i].trim() !== '')
                    result += 1;
            return result;
        };
        TextHelper.escapeRegExp = function (s) {
            return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
            this._part = TextSpinner.ParsePart(text, 0, text.length, config);
        }
        TextSpinner.ParsePart = function (text, startIdx, endIdx, config) {
            if (config === void 0) { config = new SpinTexter.ParserConfig(-1); }
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
        //public toArrayString(): Array<any>
        //{
        //    return this._part.toArrayString();
        //}
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
            if (config === void 0) { config = new SpinTexter.ParserConfig(-1); }
            return new TextSpinner(text, config).toString();
        };
        return TextSpinner;
    }());
    SpinTexter.TextSpinner = TextSpinner;
})(SpinTexter || (SpinTexter = {}));
//# sourceMappingURL=app.js.map
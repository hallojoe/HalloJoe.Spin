HalloJoe.Spin
==================
A `{spin|spin text|text spinner|spintax}` component, that allow you to spin text, calculate variations and count min/max word counts.

About
-----------
This was originally written in VB, then converted to C# and TypeScript.

Features
-----------
* Supports both flat and nested spin text
* Syntax error handling (Locate missing opening or closing bracket)
* Supports seed value to reproduce results (VB/C# versions are not compatible TypeScript version)
* Counts possible variations 
* Counts min/max words
* Super fast

---

### Usage 1
```
Imports HalloJoe.Spin
...
Dim text = TextSpinner.Spin("A {spin|spin text|text spinner|spintax} component.")
...
```

### Usage 2
```
Imports HalloJoe.Spin
...
Dim spin = "A {spin|spin text|text spinner|spintax} component."
Dim seed = New Random(DateTime.Now.GetHashCode())

Dim ts = New TextSpinner(spin, seed)
Dim text = ts.Spin()

Console.WriteLine("Example:")
Console.WriteLine(text)
Console.WriteLine("Data:")
Console.WriteLine("Variations: {0}, Min. words: {1}, Max. words: {2}", _
                  ts.CountVariants(), ts.CountMinWords(), ts.CountMaxWords())
...
```


### License 

(The MIT License)

Copyright (c) 2014 - 2017 HalloJoe <hallojoe.dk>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

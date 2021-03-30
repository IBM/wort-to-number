# Word To Number

> Transforms numbers written as words (in German language) into numbers

> Umwandlung von Zahlen als Wörter in Zahlen

> Example: "Mario ist dreiunddreißig Jahre alt" -> "Mario ist 33 Jahre alt"

- Developed for Watson Speech to Text
- For now covers 0 to 999999
- Converts only matching numbers, rest of the string will be preserved
- supports 5-digit zip codes (e.g. "achtzig dreissig fünf München" -> "80305 München")
- supports 11-digit tax ids (e.g. "fünf dreiundzwanzig vier fünf sechsundsechzig acht neun eins eins" -> "52345668911")

# Install

```
npm install wort-to-number --save
```

# Usage

```javascript
const wordToNumber = require("wort-to-number");

console.log(wordToNumber("eintausenddreihundertsiebenunddreißig"));
// "1337"
```

# License

[MIT](https://tldrlegal.com/license/mit-license)

## Open Source @ IBM

Find more open source projects on the
[IBM Github Page](http://ibm.github.io/).

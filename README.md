# Word To Number

> Transforms numbers written as words (in German language) into numbers

> Now it also does the reverse transformation (numbers into german words)

> Umwandlung von Zahlen als Wörter in Zahlen

> Example: "Mario ist dreiunddreißig Jahre alt" -> "Mario ist 33 Jahre alt"

- Developed for Watson Speech to Text
- For now covers 0 to 999999
- Converts only matching numbers, rest of the string will be preserved

# Install

```
npm install word-to-number --save
```

# Usage

```javascript
const convertionOfNumber = require("word-to-number");

console.log(convertionOfNumber("eintausenddreihundertsiebenunddreißig"));
// "1337"

console.log(convertionOfNumber("999999"));
// 

```

# License

[MIT](https://tldrlegal.com/license/mit-license)

## Open Source @ IBM

Find more open source projects on the
[IBM Github Page](http://ibm.github.io/).

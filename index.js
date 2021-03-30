const numberDictionary = {
  null: "0",
  eins: "1",
  zwei: "2",
  zwo:  "2",
  drei: "3",
  vier: "4",
  fünf: "5",
  sechs: "6",
  sieben: "7",
  acht: "8",
  neun: "9",
  zehn: "10",
  elf: "11",
  zwölf: "12",
  sechzehn: "16",
  siebzehn: "17",
  zwanzig: "20",
  dreißig: "30",
  dreissig: "30",
  vierzig: "40",
  fünfzig: "50",
  sechzig: "60",
  siebzig: "70",
  achtzig: "80",
  neunzig: "90",
  hundert: "100",
  einhundert: "100",
  tausend: "1000",
  eintausend: "1000"
};

function flatMap(array) {
  let a = [];
  array.forEach(e => {
    a = a.concat(e);
  });
  return a;
}

function insertSeparators(array, separator) {
  const newArray = [];
  let i = 1;

  for (i; i < array.length; i++) {
    newArray.push(array[i - 1]);
    newArray.push(separator);
  }

  newArray.push(array[i - 1]);
  return newArray;
}

function transformWithMultiplicand(str, index, multiplicand) {
  let multiplier;
  if (str.substr(0, index) === "ein") {
    multiplier = 1;
  } else {
    multiplier = parseInt(mapWordToNumber(str.substr(0, index)), 10);
  }

  const rest = mapWordToNumber(str.substr(index + 7)) || 0;

  return (multiplier * multiplicand + parseInt(rest, 10)).toString();
}

function mapWordToNumber(word) {
  let index;
  if (numberDictionary[word]) {
    return numberDictionary[word];
  }

  for (const [digit, multiplicand] of [["tausend", 1000], ["hundert", 100]]) {
    index = word.indexOf(digit);
    if (index !== -1) {
      return transformWithMultiplicand(word, index, multiplicand);
    }
  }

  index = word.indexOf("zehn");
  if (index !== -1 && word.endsWith("zehn")) {
    return `${10 + parseInt(numberDictionary[word.substr(0, index)], 10)}`;
  }

  array = word.split("und");
  if (array.length <= 1) {
    return word;
  }

  return sumNumbers(array);
}

function sumNumbers(array) {
  return array
    .reduce((total, current) => {
      if (!current) {
        return total;
      }

      if (current === "ein") {
        return total + 1;
      }
      return total + parseInt(numberDictionary[current], 10);
    }, 0)
    .toString();
}

module.exports = (str, smart = false) => {
  if (!str) {
    return str;
  }

  let a = [str];
  
  [" ", ",", "."].forEach(separator => {
    a = flatMap(
      a.map(e => {
        return insertSeparators(e.split(separator), separator);
      })
    );
  });

  const paragraph = a.map(mapWordToNumber).join("");

  if(smart){
    // check for tax id
    let regex = /(\d\s?\d\s?\d\s?\d\s?\d\s?\d\s?\d\s?\d\s?\d\s?\d\s?\d)/g;
    let found = paragraph.match(regex);

    if(found && found.length && found.length > 0){
      return paragraph.replace(found[0], found[0].replace(/\s/g,''));
    }

    //check for zip codes
    regex = /(\d\s?\d\s?\d\s?\d\s?\d)/g;
    found = paragraph.match(regex);

    if(found && found.length && found.length > 0){
      return paragraph.replace(found[0], found[0].replace(/\s/g,''));
    }
  }

  return paragraph;
};

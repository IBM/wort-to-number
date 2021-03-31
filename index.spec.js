const wordToNumber = require("./index");

describe("Word to Number", () => {
  it("canary test", () => {
    expect(true).toBe(true);
  });

  it("should return empty string when empty string is passed", () => {
    expect(wordToNumber("")).toEqual("");
  });

  it("should return null when null is passed", () => {
    expect(wordToNumber(null)).toEqual(null);
  });

  it("should return same string containing no numbers", () => {
    const str = "Garage, Cloud, Munich;";
    expect(wordToNumber(str)).toEqual(str);
  });

  describe("simple numbers", () => {
    [
      ["null", "0"],
      ["eins", "1"],
      ["zwei", "2"],
      ["zwo", "2"],
      ["drei", "3"],
      ["vier", "4"],
      ["fünf", "5"],
      ["sechs", "6"],
      ["sieben", "7"],
      ["acht", "8"],
      ["neun", "9"],
      ["zehn", "10"],
      ["elf", "11"],
      ["zwölf", "12"],
      ["sechzehn", "16"],
      ["siebzehn", "17"],
      ["zwanzig", "20"]
    ].forEach(([text, num]) => {
      it(`should return ${num} when ${text} is passed`, () => {
        expect(wordToNumber(text)).toEqual(num);
      });
    });

    it("should return 'Mario ist 7 Jahre alt' when string with 'Mario ist sieben Jahre alt' is passed", () => {
      expect(wordToNumber("Mario ist sieben Jahre alt")).toEqual(
        "Mario ist 7 Jahre alt"
      );
    });
  });

  describe("concatinated numbers (two digits)", () => {
    [
      ["einundzwanzig", "21"],
      ["zweiundzwanzig", "22"],
      ["dreiundzwanzig", "23"],
      ["vierundzwanzig", "24"],
      ["einunddreissig", "31"],
      ["dreiunddreißig", "33"],
      ["fünfundvierzig", "45"],
      ["siebenundfünfzig", "57"],
      ["achtundsechzig", "68"],
      ["neunundsiebzig", "79"],
      ["dreiundachtzig", "83"],
      ["neunundneunzig", "99"]
    ].forEach(([text, num]) => {
      it(`should return ${num} when ${text} is passed`, () => {
        expect(wordToNumber(text)).toEqual(num);
      });
    });
  });

  describe("concatinated numbers (three digits)", () => {
    [
      ["hundert", "100"],
      ["einhundert", "100"],
      ["fünfhundert", "500"],
      ["einhundertacht", "108"],
      ["einhundertundsieben", "107"],
      ["zweihunderteins", "201"],
      ["sechshundertsechsundsechzig", "666"],
      ["neunhundertneunundneunzig", "999"]
    ].forEach(([text, num]) => {
      it(`should return ${num} when ${text} is passed`, () => {
        expect(wordToNumber(text)).toEqual(num);
      });
    });
  });

  describe("concatinated numbers (four-six digits)", () => {
    [
      ["tausend", "1000"],
      ["eintausend", "1000"],
      ["zweitausend", "2000"],
      ["dreitausend", "3000"],
      ["viertausendvier", "4004"],

      ["sechstausendsechs", "6006"],

      ["achttausendvierunddreißig", "8034"],

      ["siebentausendeinhundertzweiundachtzig", "7182"],
      ["neuntausendvierhundertdreizehn", "9413"],
      ["zehntausend", "10000"],
      ["fünfzehntausendsieben", "15007"],
      ["zweiunddreißigtausendfünfhundertachtundvierzig", "32548"],
      ["hunderttausend", "100000"],
      ["einhunderttausend", "100000"],
      ["neunhundertneunundneunzigtausendneunhundertneunundneunzig", "999999"]
    ].forEach(([text, num]) => {
      it(`should return ${num} when ${text} is passed`, () => {
        expect(wordToNumber(text)).toEqual(num);
      });
    });
  });

  describe("complex numbers", () => {
    [
      ["dreizehn", "13"],
      ["vierzehn", "14"],
      ["fünfzehn", "15"],
      ["achtzehn", "18"],
      ["neunzehn", "19"]
    ].forEach(([text, num]) => {
      it(`should return ${num} when ${text} is passed`, () => {
        expect(wordToNumber(text)).toEqual(num);
      });
    });
  });

  describe("multiple single digits", () => {
    it("should return '1 2' when string with 'eins zwei' is passed", () => {
      expect(wordToNumber("eins zwei")).toEqual("1 2");
    });

    it("should return '2 6 0' when string with 'zwei sechs null' is passed", () => {
      expect(wordToNumber("zwei sechs null")).toEqual("2 6 0");
    });
  });

  describe("separators", () => {
    it("should return '2,6,0' when string with special character  'zwei,sechs,null' is passed", () => {
      expect(wordToNumber("zwei,sechs,null")).toEqual("2,6,0");
    });

    it("should return '2,13,0' when string with special character  'zwei,dreizehn,null' is passed", () => {
      expect(wordToNumber("zwei,dreizehn,null")).toEqual("2,13,0");
    });

    it("should return '14,15.1' when string with special character  'vierzehn,fünfzehn.eins' is passed", () => {
      expect(wordToNumber("vierzehn,fünfzehn.eins")).toEqual("14,15.1");
    });

    it("should return '3.8.5' when string with special character 'drei.acht.fünf' is passed", () => {
      expect(wordToNumber("drei.acht.fünf")).toEqual("3.8.5");
    });

    it("should return '13.85 2, 7' when string with special character 'dreizehn.fünfundachtzig zwei, sieben' is passed", () => {
      expect(wordToNumber("dreizehn.fünfundachtzig zwei, sieben")).toEqual(
        "13.85 2, 7"
      );
    });
  });

  describe("smart formatting", () => {
    describe("address strings", () => {
      it('should return standalone postal code wit single digits, without white spaces', () => {
        expect(wordToNumber("acht null neun neun zwei", true)).toEqual("80992");
      })

      it('should return standalone postal code with multi-digits, without white spaces', () => {
        expect(wordToNumber("achtzig neunundneunzig zwei", true)).toEqual("80992");
      })

      it('should return postal code with city name without white spaces', () => {
        expect(wordToNumber("acht null neun neun zwei München", true)).toEqual("80992 München");
      })

      it('should return postal code with noise without white spaces', () => {
        expect(wordToNumber("Das ist die acht null neun neun zwei München", true)).toEqual("Das ist die 80992 München");
      })

      describe('should return whole adress', () => {
        [
          ["Poststraße fünf, eins zwei drei vier fünf München", "Poststraße 5, 12345 München"],
          ["Poststraße zwanzig achtzig zwo dreißig München", "Poststraße 20 80230 München"],
          ["Poststraße einhundertzehn, achtzig dreissig fünf München", "Poststraße 110, 80305 München"],
          ["Dachauer str. achtzehn in acht null neun neun zwei München", "Dachauer str. 18 in 80992 München"],
          ["Dachauer str. einhundertundeins in acht null drei drei acht", "Dachauer str. 101 in 80338"],
          ["In der Nymphenburger Straße achtzehn.", "In der Nymphenburger Straße 18."]].forEach(([text, res]) => {
            it(`should return ${res} when ${text} is passed`, () => {
              expect(wordToNumber(text, true)).toEqual(res);
            });
          });
      })
    })

    describe("tax id string", () => {
      it('should return single digits as tax id', () => {
        expect(wordToNumber("eins zwei drei vier fünf sechs sieben acht neun eins zwei", true)).toEqual("12345678912");
      })

      it('should return multi numbers as tax id', () => {
        expect(wordToNumber("fünf dreiundzwanzig vier fünf sechsundsechzig acht neun eins eins", true)).toEqual("52345668911");
      })

      it('should return multi numbers as tax id and preserve other text', () => {
        expect(wordToNumber("Das ist die einhundertfünfundfünfzig dreihundertundeins dreihundertzweiunddreißig zwölf", true)).toEqual("Das ist die 15530133212");
      })
    })
  })
});

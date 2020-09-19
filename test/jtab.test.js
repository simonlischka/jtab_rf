import Raphael from "raphael";
import jtab from "jtab"; // this monkey patches Raphael and needs to be here

describe("jtab tests", () => {
  describe("raphael", () => {
    test("should recognize guitar string number by `$NUMBER` and `$LETTER` syntax", () => {
      let get_string_number = Raphael.fn.get_string_number;

      expect(get_string_number("$1")).toBe(1);
      expect(get_string_number("$2")).toBe(2);
      expect(get_string_number("$3")).toBe(3);
      expect(get_string_number("$4")).toBe(4);
      expect(get_string_number("$5")).toBe(5);
      expect(get_string_number("$6")).toBe(6);
      expect(get_string_number("$e")).toBe(1);
      expect(get_string_number("$B")).toBe(2);
      expect(get_string_number("$G")).toBe(3);
      expect(get_string_number("$D")).toBe(4);
      expect(get_string_number("$A")).toBe(5);
      expect(get_string_number("$E")).toBe(6);
    });
  });

  describe("Notation characterization", () => {
    describe("should recognize chord and tab notation", () => {
      //TODO: Improve test descriptions
      test("when containing chords, various tab symbols and multiple bars", () => {
        let tabtype = jtab.characterize(
          //TODO: Double escaped the back slide here because babel's strict mode raises error. Check if
          //it still gets parsed correctly - if not find a way to disable strict mode or update the parser.
          "Bm $3 4 4h5p3h4 5 $2 3 5 7 7h8p7 5/7 | A $4 7 9 $3 7 6 $5 9 $4 7h9 7 $5 9\\7 5/7 | "
        );

        expect(tabtype).toBe(1);
      });

      test("when containing smaller subset of chords and tabs", () => {
        let tabtype = jtab.characterize("A7 $e 2 3 $B.3.$e.2");

        expect(tabtype).toBe(1);
      });

      test("when having medium subset of chords and tabs", () => {
        let tabtype = jtab.characterize(
          "Bm $3 4 4h5p3h4 5 $2 3 5 7 7h8p7 5/7 "
        );

        expect(tabtype).toBe(1);
      });
    });

    describe("should recognize custom chord only notation", () => {
      test("when containing chord with name", () => {
        let tabtype = jtab.characterize("%X/X.4/3.2/2.0/0.1/1.0/0[C]");

        expect(tabtype).toBe(2);
      });

      test("when containing chord without a name", () => {
        let tabtype = jtab.characterize("%X/X.4/3.2/2.0/0.1/1.0/0");

        expect(tabtype).toBe(2);
      });
    });

    describe("should recognize tab only notation", () => {
      //TODO: Improve test descriptions

      test("when containing some tab 1", () => {
        var tabtype = jtab.characterize("$1 2 3 $2.3.$1.2");

        expect(tabtype).toBe(3);
      });

      test("when containing some tab 2", () => {
        var tabtype = jtab.characterize("$e 2 3 $B.3.$e.2");

        expect(tabtype).toBe(3);
      });

      test("when containing some tab 3", () => {
        var tabtype = jtab.characterize("X02220  8.10.10.9.8.8");

        expect(tabtype).toBe(3);
      });
    });
  });
});

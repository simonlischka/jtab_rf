import Raphael from "raphael";
import jtab from "jtab"; // this monkey patches Raphael and needs to be here

describe("jtab tests", () => {
  describe("raphael", () => {
    test("should get string number", () => {
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
    describe("with notes of type chords and tabs", () => {
      test("should be recognized when using all available tab symbols", () => {
        let tabtype = jtab.characterize(
          "Bm $3 4 4h5p3h4 5 $2 3 5 7 7h8p7 5/7 | A $4 7 9 $3 7 6 $5 9 $4 7h9 7 $5 9\7 5/7 | "
        );

        expect(tabtype).toBe(1);
      });

      test("should ", () => {
        let tabtype = jtab.characterize("A7 $e 2 3 $B.3.$e.2");

        expect(tabtype).toBe(1);
      });

      test("should ", () => {
        let tabtype = jtab.characterize(
          "Bm $3 4 4h5p3h4 5 $2 3 5 7 7h8p7 5/7 "
        );

        expect(tabtype).toBe(1);
      });
    });
  });
});

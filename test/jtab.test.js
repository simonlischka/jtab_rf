import Raphael from "raphael";
import jtab, { jtabChord } from "jtab";

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
          //TODO: Double escaped the back slide here because babel"s strict mode raises error. Check if
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

  /*
  In our CAGED system, we'll be using positions as defined in the following matrix

    C = position 1
    A = position 2
    G = position 3
    E = position 4
    D = position 5

  As such position 1 can also be called the 'C shape' position, position 2 the
  'A shape' position, etc.

  Playing different chord voicings then becomes nothing more than just shifting the
  appropriate shapes around to coincide the shape's root note with the desired chord's
  root note on the fretboard.

  Eg.

    Fret 0        X_R_______O
                  |_|_|_|_|_|
                  |_|_1_2_3_|
    Fret 3        |_|_|_|_|_|
                  |_|_|_|_|_|

            An 'A shaped' A major where its root note is at 'R'

    Fret 0        X__________
                  |_|_|_|_|_|
                  |_R_|_|_|_1
    Fret 3        |_|_|_|_|_|
                  |_|_2_3_4_|

            An 'A shaped' B major with root of A shape over B note on 5th string

  Position/shape can be defined in our chord token,

  Eg. C:1, Cmaj7:3, etc.

  where the numbers 1-5 after the ':' in token reflects the desired position/shape.

  If in the absence of specified position/shape in token, we'll use the most playable
  shape as the desired chord's position/shape. In general,

  - Chords with root note within C, A, G, E, D will take the shape of it's root note except
    * major 7ths
    * minor chords
    * dominants above 7ths, eg. C9, C11, etc.
    * augmented chords
    * diminished chords
  - E & A shapes (good for barred chords) will be considered for exceptions above
  - Chords with root note that falls within B, Bb, C#, Eb will use  A shape
  - Chords with root note that falls within F, F#, G# will take E shape
  */
  describe("Chord", () => {
    describe("should set it's root note correctly with chords of various tonalities", () => {
      console.log(jtab.jtabchord);

      test("when creating C chords", () => {
        expect(new jtabChord("C").rootNote).toBe("C");
        expect(new jtabChord("C#").rootNote).toBe("C#");
        expect(new jtabChord("C#maj7").rootNote).toBe("C#");
        expect(new jtabChord("C#maj7:1").rootNote).toBe("C#");
      });

      test("when creating D chords", () => {
        expect(new jtabChord("Db").rootNote).toBe("Db");
        expect(new jtabChord("Dbmaj7").rootNote).toBe("Db");
        expect(new jtabChord("Dbmaj7:2").rootNote).toBe("Db");
      });
    });
  });
});

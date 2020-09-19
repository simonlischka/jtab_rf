import Raphael from 'raphael';
import jtab from 'jtab'; // this monkey patches Raphael and needs to be here
describe('jtab tests', () => {
    test('raphael get string number', () => {
        let get_string_number = Raphael.fn.get_string_number;

        expect( get_string_number("$1")).toBe(1);
        expect( get_string_number("$2")).toBe(2);
        expect( get_string_number("$3")).toBe(3);
        expect( get_string_number("$4")).toBe(4);
        expect( get_string_number("$5")).toBe(5);
        expect( get_string_number("$6")).toBe(6);
        expect( get_string_number("$e")).toBe(1);
        expect( get_string_number("$B")).toBe(2);
        expect( get_string_number("$G")).toBe(3);
        expect( get_string_number("$D")).toBe(4);
        expect( get_string_number("$A")).toBe(5);
        expect( get_string_number("$E")).toBe(6);
    });
});

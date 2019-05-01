import {
    isArray,
    isBoolean,
    isFunction,
    isString,
    isDate,
    isNullOrUndefined,
    isNumber
} from "./index";

describe("Lang Utilities", () => {
    test("all", () => {
        expect(isArray(null)).toBeFalsy();
        expect(isArray(undefined)).toBeFalsy();
        expect(isArray("")).toBeFalsy();
        expect(isArray(4)).toBeFalsy();
        expect(isArray(true)).toBeFalsy();
        expect(isArray(false)).toBeFalsy();
        expect(isArray([])).toBeTruthy();

        expect(isBoolean(null)).toBeFalsy();
        expect(isBoolean(undefined)).toBeFalsy();
        expect(isBoolean("")).toBeFalsy();
        expect(isBoolean(4)).toBeFalsy();
        expect(isBoolean([])).toBeFalsy();
        expect(isBoolean(true)).toBeTruthy();
        expect(isBoolean(false)).toBeTruthy();

        expect(isNumber(null)).toBeFalsy();
        expect(isNumber(undefined)).toBeFalsy();
        expect(isNumber("")).toBeFalsy();
        expect(isNumber(true)).toBeFalsy();
        expect(isNumber(false)).toBeFalsy();
        expect(isNumber([])).toBeFalsy();
        expect(isNumber(4)).toBeTruthy();

    });
});
import * as PathUtils from "PathUtils";

describe("Path Utilities", () => {
    test("join()", () => {
        expect(PathUtils.join("a", "/b", "c/", "d")).toBe("a/b/c/d");
        expect(PathUtils.join("a", "b/", "..", "c")).toBe("a/c");
        expect(PathUtils.join("a", "b/", ".", "c")).toBe("a/b/c");
    });
    test("normalize()", () => {
        expect(PathUtils.normalize("a/b/../c/./d")).toBe("a/c/d");
    });
    test("isAbsolute()", () => {
        expect(PathUtils.isAbsolute("/a/b")).toBeTruthy();
        expect(PathUtils.isAbsolute("a/b/")).toBeFalsy();
    });
    test("basename()", () => {
        expect(PathUtils.basename("what/poo.html", ".html")).toBe("poo");
        expect(PathUtils.basename("what/poo.html")).toBe("poo.html");
    });
    test("parent()", () => {
        expect(PathUtils.parent("what/the/hell")).toBe("what/the");
    });
    test("dirname()", () => {
        expect(PathUtils.dirname("what/the/")).toBe("what");
        expect(PathUtils.dirname("i/found/a/nice/shell")).toBe("i/found/a/nice");
        expect(PathUtils.dirname("hello.txt")).toBe(".");
    });
});
import { PathTemplate } from "./PathTemplate";

describe("Path Template Test", () => {

    test("params", () => {
       const template = new PathTemplate("/what/:have/u/:done", { end: false });
       expect(template.paramNames.length).toBe(2);
       expect(template.paramNames[0]).toBe("have");
       expect(template.paramNames[1]).toBe("done");
       const r = template.test("/what/have/u/done");
       expect(r.match).toBeTruthy();
       expect(r.params.have).toBe("have");
       expect(r.params.done).toBe("done");
    });

    test("param beginning", () => {
        const template = new PathTemplate("/:first/bacon");
        expect(template.paramNames.length).toBe(1);
        expect(template.paramNames[0]).toBe("first");
        let r = template.test("/salty/bacon");
        expect(r.match).toBeTruthy();
        expect(r.params.first).toBe("salty");
    });

    test("param ending", () => {
        const template = new PathTemplate("/hello/:name");
        expect(template.paramNames.length).toBe(1);
        expect(template.paramNames[0]).toBe("name");
        let r = template.test("/hello/boony");
        expect(r.match).toBeTruthy();
        expect(r.params.name).toBe("boony");
    })
});
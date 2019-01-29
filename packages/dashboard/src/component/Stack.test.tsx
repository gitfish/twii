import { Dashboard } from "../model/Dashboard";
import { Stack } from "../model/Stack";
import { Window } from "../model/Window";

describe("Stack View Test", () => {
    test("Basic Stack Rendering", () => {
        const dashboard = new Dashboard();
        const m = new Stack();
        const w1 = new Window();
        w1.path = "/test1";
        const w2 = new Window();
        w2.path = "/test2";
    });
});
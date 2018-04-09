import { Context } from "Context";

class Sample {
    get id() {
        return "sample";
    }
};

const sampleFactory = () => {
    return new Sample();
};

describe("Context", () => {
    test("factory config", () => {
        const ctx = new Context<Sample>({
            factory: sampleFactory
        });

        const ref1 = ctx.value;
        const ref2 = ctx.value;

        expect(ref1).toBe(ref2);
    });

    test("ref config", () => {
        const ctx = new Context<Sample>({
            value: new Sample()
        });

        const ref1 = ctx.value;
        const ref2 = ctx.value;

        expect(ref1).toBe(ref2);

        ctx.value = undefined;

        const ref3 = ctx.value;

        expect(ref3).toBe(ref1);
    });
});
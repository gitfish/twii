import EventEmitter from "common/EventEmitter";

describe("Event Emitter", () => {
    test("listener management", () => {
        const e = new EventEmitter();
        let callbackEvent : any;
        let handlerEvent : any;
        const callback = (event : any) => {
            callbackEvent = event;
        };
        e.addEventListener("help", callback);
        const handler = {
            handleEvent(event : any) {
                handlerEvent = event;
            }
        };
        e.addEventListener("foo", handler);

        expect(e.hasListenerOfType("help")).toBeTruthy();
        expect(e.hasListenerOfType("foo")).toBeTruthy();
        expect(e.hasListenerOfType("dunno")).toBeFalsy();
        expect(e.containsListener("foo", handler));

        e.emit({ type: "help", message: "woo" });

        expect(callbackEvent.type).toBe("help");
        expect(callbackEvent.message).toBe("woo");

        e.emit({ type: "foo", message: "bah" });

        expect(handlerEvent.type).toBe("foo");
        expect(handlerEvent.message).toBe("bah");

        e.removeEventListener("help", callback);

        expect(e.hasListenerOfType("help")).toBeFalsy();
    });
});
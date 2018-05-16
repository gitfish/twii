import { ComponentGlobals } from "./ComponentGlobals";

const dispatchWindowResizeImmediate = () => {
    ComponentGlobals.ignoreResize = true;
    try {
        var event = document.createEvent("Event");
        event.initEvent("resize", true, true);
        window.dispatchEvent(event);
    } finally {
        ComponentGlobals.ignoreResize = false;
    }
}

const dispatchWindowResize = () => {
    // may need to debounce this in the future
    dispatchWindowResizeImmediate();
};

export {
    dispatchWindowResize
}
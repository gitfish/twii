import { ComponentGlobals } from "../ComponentGlobals";

const removeAllChildren = (node : Node) : Node[] => {
    const r : Node[] = [];
    while(node.childNodes.length > 0) {
        r.push(node.removeChild(node.childNodes.item(0)));
    }
    return r;
};

const shrinkChildren = (node : Node, count : number) => {
    while(node.childNodes.length > count) {
        node.removeChild(node.childNodes.item(node.childNodes.length - 1));
    }
};

const setSingleChild = (node : Node, content : Node) => {
    if(node.childNodes.length === 0) {
        node.appendChild(content);
    } else if(node.childNodes.item(0) !== content) {
        node.replaceChild(content, node.childNodes.item(0));
    }
};

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

export { removeAllChildren, shrinkChildren, setSingleChild, dispatchWindowResize }
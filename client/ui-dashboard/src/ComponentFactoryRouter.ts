import { Router } from "roota/lib/Router";
import { window, stack, list, vsplit, hsplit } from "./ComponentTypes";

const r = new Router();
r.use(window, req => {
    return import("./Window").then(m => {
        return new m.Window();
    });
});
r.use(stack, req => {
    return import("./Stack").then(m => {
        return new m.Stack();
    });
});
r.use(list, req => {
    return import("./List").then(m => {
        return new m.List();
    });
})
r.use(vsplit, req => {
    return import("./Split").then(m => {
        return new m.VSplit();
    });
});
r.use(hsplit, req => {
    return import("./Split").then(m => {
        return new m.HSplit();
    });
});

export { r as default, r as ComponentFactoryRouter }
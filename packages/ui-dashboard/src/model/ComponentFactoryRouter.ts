import { Router } from "roota/lib/Router";
import { window, stack, list, vsplit, hsplit } from "./ComponentTypes";

const ComponentFactoryRouter = new Router();
ComponentFactoryRouter.use(window, req => {
    return import("./Window").then(m => {
        return new m.Window();
    });
});
ComponentFactoryRouter.use(stack, req => {
    return import("./Stack").then(m => {
        return new m.Stack();
    });
});
ComponentFactoryRouter.use(list, req => {
    return import("./List").then(m => {
        return new m.List();
    });
})
ComponentFactoryRouter.use(vsplit, req => {
    return import("./Split").then(m => {
        return new m.VSplit();
    });
});
ComponentFactoryRouter.use(hsplit, req => {
    return import("./Split").then(m => {
        return new m.HSplit();
    });
});

export { ComponentFactoryRouter }
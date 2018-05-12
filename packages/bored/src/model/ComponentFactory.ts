import { Router } from "@twii/router/lib/Router";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import { IComponent } from "./IComponent";
import { window, stack, vsplit, hsplit, grid } from "./ComponentTypes";

interface IComponentFactory {
    (type : string) : Promise<IComponent>;
}

interface ITypeComponentSupplierMap {
    [key : string]: ISupplierFunc<Promise<IComponent>>;
}

const WindowSupplier = () => {
    return import("./Window").then(m => {
        return new m.Window();
    });
};

const StackSupplier = () => {
    return import("./Stack").then(m => {
        return new m.Stack();
    });
};

const VSplitSupplier = () => {
    return import("./Split").then(m => {
        return new m.VSplit();
    });
};

const HSplitSupplier = () => {
    return import("./Split").then(m => {
        return new m.HSplit();
    });
};

const GridSupplier = () => {
    return import("./Grid").then(m => {
        return new m.Grid();
    });
};

const TypeComponentSupplierMap : ITypeComponentSupplierMap = {};
TypeComponentSupplierMap[window] = WindowSupplier;
TypeComponentSupplierMap[stack] = StackSupplier;
TypeComponentSupplierMap[hsplit] = HSplitSupplier;
TypeComponentSupplierMap[vsplit] = VSplitSupplier;
TypeComponentSupplierMap[grid] = GridSupplier;

const ComponentFactory : IComponentFactory = (type : string) => {
    const s = TypeComponentSupplierMap[type];
    if(s) {
        return s();
    }
    return Promise.reject({ code: "NOT_FOUND", type: type, message: `Component Type ${type} is not registered`});
};

export { IComponentFactory, ComponentFactory }
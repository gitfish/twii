import { Router } from "@twii/router/lib/Router";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import { IComponent } from "./IComponent";
import { IComponentFactory } from "./IComponentFactory";
import { window, stack, vsplit, hsplit, grid } from "./ComponentTypes";
import { Window } from "./Window";
import { Stack } from "./Stack";
import { HSplit, VSplit } from "./Split";
import { Grid } from "./Grid";

interface IComponentFactoryMap {
    [key : string]: () => IComponent;
}

const ComponentFactoryMap : IComponentFactoryMap = {};
ComponentFactoryMap[window] = () => {
    return new Window();
};
ComponentFactoryMap[stack] = () => {
    return new Stack();
};
ComponentFactoryMap[hsplit] = () => {
    return new HSplit();
};
ComponentFactoryMap[vsplit] = () => {
    return new VSplit();
};
ComponentFactoryMap[grid] = () => {
    return new Grid();   
};

const ComponentFactory : IComponentFactory = (type : string) => {
    const s = ComponentFactoryMap[type];
    if(s) {
        return s();
    }
    throw { code: "NOT_FOUND", type: type, message: `Component Type ${type} is not registered`};
};

export {
    IComponentFactory,
    ComponentFactory,
    IComponentFactoryMap,
    ComponentFactoryMap
}
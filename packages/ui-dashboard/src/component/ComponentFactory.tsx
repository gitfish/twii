import * as React from "react";
import { IComponent } from "../model/IComponent";
import { IStack } from "../model/IStack";
import { Stack } from "./Stack";
import { IHSplit, IVSplit } from "../model/ISplit";
import { HSplit, VSplit } from "./Split";
import { IWindow } from "../model/IWindow";
import { ProjectedWindowPortal } from "./WindowPortal";
import { List } from "./List";

interface IComponentFactory {
    (comp : IComponent) : React.ReactNode;
}

interface ITypeComponentFactoryMap {
    [key : string]: IComponentFactory;
}

const StackComponentFactory = (comp : IComponent) => {
    return <Stack stack={comp as IStack} />;
};

const HSplitComponentFactory = (comp : IComponent) => {
    return <HSplit hsplit={comp as IHSplit} />;
};

const VSplitComponentFactory = (comp : IComponent) => {
    return <VSplit vsplit={comp as IVSplit} />;
};

const WindowComponentFactory = (comp : IComponent) => {
    return <ProjectedWindowPortal window={comp as IWindow} />;
};

const ListComponentFactory = (comp : IComponent) => {
    return <List stack={comp as IStack} />;
};

const ComponentFactoryMap : ITypeComponentFactoryMap = {
    stack: StackComponentFactory,
    hsplit: HSplitComponentFactory,
    vsplit: VSplitComponentFactory,
    window: WindowComponentFactory,
    list: ListComponentFactory
};

const ComponentFactory = (comp : IComponent) => {
    if(comp) {
        const f = ComponentFactoryMap[comp.type];
        if(f) {
            return f(comp);
        }
    }
    return null;
};

export { ComponentFactory as default, ComponentFactory }
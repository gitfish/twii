import * as React from "react";
import { IComponent } from "@twii/bored/lib/model/IComponent";
import { IStack } from "@twii/bored/lib/model/IStack";
import { Stack } from "./Stack";
import { IHSplit, IVSplit } from "@twii/bored/lib/model/ISplit";
import { HSplit } from "./HSplit";
import { VSplit } from "./VSplit";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { Grid } from "./Grid";
import { IGrid } from "@twii/bored/lib/model/IGrid";

interface IViewFactory {
    (comp : IComponent) : React.ReactNode;
}

interface ITypeViewFactoryMap {
    [key : string]: IViewFactory;
}

const StackViewFactory = (comp : IComponent) => {
    return <Stack stack={comp as IStack} />;
};

const HSplitViewFactory = (comp : IComponent) => {
    return <HSplit hsplit={comp as IHSplit} />;
};

const VSplitViewFactory = (comp : IComponent) => {
    return <VSplit vsplit={comp as IVSplit} />;
};

const GridViewFactory = (comp : IComponent) => {
    return <Grid grid={comp as IGrid} />;
};

const ViewFactoryMap : ITypeViewFactoryMap = {
    stack: StackViewFactory,
    hsplit: HSplitViewFactory,
    vsplit: VSplitViewFactory,
    grid: GridViewFactory
};

const ViewFactory = (comp : IComponent) => {
    if(comp) {
        const f = ViewFactoryMap[comp.type];
        if(f) {
            return f(comp);
        }
    }
    return null;
};

export { ViewFactory as default, ViewFactory }
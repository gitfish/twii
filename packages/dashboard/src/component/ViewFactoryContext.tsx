import * as React from "react";
import { MappedViewFactory } from "./MappedViewFactory";
import { StackViewFactory } from "./StackViewFactory";
import { HSplitViewFactory } from "./HSplitViewFactory";
import { VSplitViewFactory } from "./VSplitViewFactory";
import { GridViewFactory } from "./GridViewFactory";
import { IViewFactory } from "./IViewFactory";

const Defaults = {
    createViewFactory: () => {
        const factory = new MappedViewFactory();
        factory.setFactory("stack", new StackViewFactory());
        factory.setFactory("hsplit", new HSplitViewFactory());
        factory.setFactory("vsplit", new VSplitViewFactory());
        factory.setFactory("grid", new GridViewFactory());
        return factory;
    }
};

// NOTE that this is a react context (not app context)
const ViewFactoryContext = React.createContext<IViewFactory>(Defaults.createViewFactory());

export { ViewFactoryContext, Defaults }
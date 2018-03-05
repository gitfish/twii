import { observable } from "mobx";

interface IComponentGlobals {
    ignoreResize: boolean;
}

const ComponentGlobals : IComponentGlobals = {
    ignoreResize: false
};

export { IComponentGlobals, ComponentGlobals }
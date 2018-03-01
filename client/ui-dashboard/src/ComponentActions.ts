import { action } from "mobx";
import { IComponent } from "./model/IComponent";
import { IComponentRemoveOptions } from "./model/IComponentRemove";
import { ComponentRemoveStore } from "./ComponentRemoveStore";

const removeComponent = (opts : IComponentRemoveOptions) => {
    ComponentRemoveStore.init(opts);
};

export { removeComponent }
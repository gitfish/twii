import { action } from "mobx";
import IComponent from "./IComponent";
import { IComponentRemoveOptions } from "./IComponentRemoveModel";
import ComponentRemoveStore from "./ComponentRemoveStore";

const removeComponent = (opts : IComponentRemoveOptions) => {
    ComponentRemoveStore.init(opts);
};

export { removeComponent }
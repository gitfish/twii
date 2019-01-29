import { IComponentRemoveOptions } from "./model/IComponentRemove";
import { ComponentRemoveStore } from "./model/ComponentRemoveStore";

const removeComponent = (opts : IComponentRemoveOptions) => {
    ComponentRemoveStore.init(opts);
};

export { removeComponent }
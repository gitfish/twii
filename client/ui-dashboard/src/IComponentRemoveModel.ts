import { IComponent } from "./IComponent";

interface IComponentRemoveOptions {
    component: IComponent;
    saveHandler?: (component : IComponent) => void;
}

interface IComponentRemoveModel {
    active : boolean;
    component : IComponent;
    init(opts: IComponentRemoveOptions) : void;
    save() : void;
    cancel() : void;
}

export { IComponentRemoveOptions, IComponentRemoveModel,  }
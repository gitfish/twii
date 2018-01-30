import { IComponent } from "./IComponent";
import { IComponentRemoveModel, IComponentRemoveOptions } from "./IComponentRemoveModel";
declare class ComponentRemoveModel implements IComponentRemoveModel {
    private _saveHandler;
    active: boolean;
    component: IComponent;
    init(opts: IComponentRemoveOptions): void;
    private _close();
    save(): void;
    cancel(): void;
}
export { ComponentRemoveModel };

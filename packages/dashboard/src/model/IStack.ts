import { IWindowManager } from "./IWindowManager";
import { IWindow, IWindowConfig } from "./IWindow";
import { ISplittable } from "./ISplittable";

interface IStackConfig {
    type?: string;
    activeIndex?: number;
    windows?: IWindowConfig[];
    closeDisabled?: boolean;
}

interface IStack extends IWindowManager, ISplittable {
    headerHeight: number;
    setHeaderHeight(headerHeight : number) : void;
    dropWindow(refWindow?: IWindow) : void;
    config: IStackConfig;
    setConfig(config : IStackConfig) : void;
}

export { IStack, IStackConfig }
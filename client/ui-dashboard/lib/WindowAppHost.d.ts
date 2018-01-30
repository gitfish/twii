import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { AbstractAppHost } from "@twii/core/lib/app/AbstractAppHost";
import { IRequest } from "roota/lib/IRequest";
import { IWindow } from "./IWindow";
declare class WindowAppHost extends AbstractAppHost {
    private _window;
    constructor(window: IWindow);
    readonly defaultRequest: {
        path: string;
        params: any;
        query: any;
    };
    open(request: IRequest): Promise<IAppHost>;
    setRequest(request: IRequest): void;
    close(): void;
    addEventListener(type: any, handler: any): void;
    removeEventListener(type: any, handler: any): void;
    emit(event: any): void;
}
export { WindowAppHost as default, WindowAppHost };

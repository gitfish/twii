import { IRequest } from "roota/lib/IRequest";
import { IComponent } from "./IComponent";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { IConsumerFunc } from "@twii/core/lib/common/IConsumerFunc";
interface IWindow extends IComponent {
    name: string;
    path: string;
    params: any;
    query: any;
    title: string;
    onClose: IConsumerFunc<IWindow>;
    closeDisabled: boolean;
    active: boolean;
    contentHidden: boolean;
    appHost: IAppHost;
    setPath(path: string): void;
    setParams(params: any): void;
    setQuery(query: any): void;
    setTitle(title: string): void;
    setCloseDisabled(closeDisabled: boolean): void;
    activate(): void;
    setContentHidden(hidden: boolean): void;
    toggleContent(): void;
    load(request: IRequest): Promise<any>;
    open(request: IRequest): Promise<IWindow>;
    close(): void;
}
export { IWindow };

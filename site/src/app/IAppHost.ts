import { IEventEmitter } from "util/IEventEmitter";
import IRequest from "roota/lib/IRequest";
import ISync from "common/ISync";

interface IAppHost extends IEventEmitter {
    id: string;
    sync: ISync;
    root: boolean;
    title: string;
    view: any;
    path: string;
    params: any;
    state: any;
    setTitle(title : string) : void;
    setState(state : any) : void;
    getUrl(request?: IRequest) : string;
    load(request?: IRequest) : Promise<any>;
    getUrl(request: IRequest) : string;
    open(request: IRequest) : Promise<IAppHost>;
    close() : void;
}

export { IAppHost as default, IAppHost }
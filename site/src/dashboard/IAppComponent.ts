import IAppHost from "app/IAppHost";
import IComponent from "./IComponent";

interface IAppComponent extends IComponent, IAppHost {
    setPath(path : string) : void;
    setParams(params : any) : void;
}

export { IAppComponent as default, IAppComponent }
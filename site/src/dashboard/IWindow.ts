import IRequest from "roota/lib/IRequest";
import IWindowManager from "./IWindowManager";
import IComponent from "./IComponent";
import IAppComponent from "./IAppComponent";
import IAppHost from "app/IAppHost";

interface IWindowHeader extends IComponent {
    title : string;
    setTitle(title : string) : void;
}

interface IWindow extends IAppComponent {
    name: string;
    unmountHandler : () => void;
    closeDisabled : boolean;
    active : boolean;
    contentHidden : boolean;
    setCloseDisabled(closeDisabled : boolean) : void;
    activate() : void;
    setContentHidden(hidden : boolean) : void;
    toggleContent() : void;
    portal : HTMLElement;
}

export { IWindow as default, IWindow, IWindowHeader }
import { IComponent } from "../model/IComponent";

interface IViewFactory {
    createView(comp : IComponent) : React.ReactNode;
}

export { IViewFactory }
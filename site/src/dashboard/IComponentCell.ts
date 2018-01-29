import IComponent from "./IComponent";

interface IComponentCell extends IComponent {
    component: IComponent;
    setComponent(component : IComponent) : void;
    componentConfig : any;
    setComponentConfig(componentConfig : any) : void;
}

export { IComponentCell as default, IComponentCell }
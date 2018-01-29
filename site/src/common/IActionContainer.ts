import IAction from "./IAction";

interface IActionContainer<T> {
    addAction(action : IAction<T>) : void;
    removeAction(action : IAction<T>) : void;
}

export { IActionContainer as default, IActionContainer }
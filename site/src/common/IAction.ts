interface IAction<T> {
    (value : T) : void;
}

export { IAction as default, IAction }
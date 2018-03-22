interface IStateManager {
    state : any;
    setState(state : any) : void;
    getState<T = any>(key : string, factory?: () => T) : T;
}

export { IStateManager }
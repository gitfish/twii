interface IList<T = any, P = any> {
    parent?: P;
    items: T[];
}

export { IList, IList as default }
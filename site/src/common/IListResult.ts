interface IListResult<T> {
    items: T[];
    total?: number;
}

export { IListResult as default, IListResult }
import ISortProps from "./ISortProps";

interface ISortHandler<T> {
    (items : T[], props : ISortProps) : T[];
}

export { ISortHandler as default, ISortHandler }
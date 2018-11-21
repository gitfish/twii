import IActivityFilterProps from "./IActivityFilterProps";

interface IActivityFilterHandler<T> {
    (items : T[], props : IActivityFilterProps) : T[];
}

export { IActivityFilterHandler as default, IActivityFilterHandler }
import { IMapFunc } from "./IMapFunc";

const identity = <T>(value : T) : T => {
    return value;
};

export { identity }
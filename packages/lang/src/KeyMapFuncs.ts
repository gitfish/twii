import { IKeyMapFunc } from "./IKeyMapFunc";

const defaultKeyMap : IKeyMapFunc = <I = any, O = any>(value, key) => {
    return value ? value[key] : undefined;
};

const mapped = <I = any, O = any>(map : { [key : string] : IKeyMapFunc<I, O>}) : IKeyMapFunc<I, O> => {
    return (value, key) => {
        return (map[key] || defaultKeyMap)(value, key);
    };
};

export {
    defaultKeyMap,
    mapped
}
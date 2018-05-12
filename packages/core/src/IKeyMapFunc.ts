interface IKeyMapFunc<I = any, O = any> {
    (value : I, key : string | number) : O;
}

export { IKeyMapFunc }
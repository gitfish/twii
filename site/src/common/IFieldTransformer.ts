interface IFieldTransformer<T = any> {
    (item : T, field : string) : any;
}

export { IFieldTransformer as default, IFieldTransformer }
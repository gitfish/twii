interface IError {
    key?: string;
    keyTitle?: string;
    prop?: string;
    propTitle?: string;
    code?: string;
    message: string;
    [key: string] : any;
}

export { IError as default, IError };
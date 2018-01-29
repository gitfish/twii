interface IError {
    prop?: string;
    propTitle?: string;
    code?: string;
    message: string;
    [key: string] : any;
}

export { IError as default, IError };
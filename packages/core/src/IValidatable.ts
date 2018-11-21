import IError from "./IError";

interface IValidatable {
    validate?(errorHandler : (error : IError) => void) : void;
}

export { IValidatable as default, IValidatable };
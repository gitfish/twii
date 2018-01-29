import IError from "common/IError";
import IRiskResumeSearchRequest from "./IRiskResumeSearchRequest";

interface IRiskResumeSearchRequestModel {
    validationErrors?: IError[];
    isValueSpecified?: boolean;
    idType?: string;
    id?: string;

    setIdType(idType?: string) : void;
    setId(id?: string) : void;

    validate() : void;
    isValid: boolean;

    submit(requestHandler: (request: IRiskResumeSearchRequest) => void);
    clear(): void;
}

export { IRiskResumeSearchRequestModel as default, IRiskResumeSearchRequestModel };
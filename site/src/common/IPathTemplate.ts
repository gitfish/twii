import IPathTestResult from "./IPathTestResult";

interface IPathTemplate {
    paramNames: string[];
    test(path : string) : IPathTestResult;
    toPath(params : any) : string;
}

export { IPathTemplate as default, IPathTemplate };
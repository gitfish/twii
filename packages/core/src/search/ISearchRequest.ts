import { ISearchGroup } from "./ISearchGroup";

interface ISearchRequest extends ISearchGroup {
    searchString?: string;
    offset?: number;
    limit?: number;
    cursorId?: string;
    allResults?: boolean;
}

export {
    ISearchRequest
}
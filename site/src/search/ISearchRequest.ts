interface ISearchRequest {
    core?: string;
    text?: string;
    offset?: number;
    limit?: number;
    sortBy?: string;
    sortDescending?: boolean;
}

export { ISearchRequest as default, ISearchRequest }
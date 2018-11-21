interface ISearchResponseFieldHighlighting {
    [key: string]: string[];
}

interface ISearchResponseHighlighting {
    [key: string]: ISearchResponseFieldHighlighting;
}

interface ISearchResponseFacetCounts {
    facet_queries?: any;
    facet_fields?: any;
    facet_ranges?: any;
    facet_intervals?: any;
    facet_heatmaps?: any;
}

interface ISearchResponse<T = any> {
    duration?: number;
    total?: number;
    offset?: number;
    results?: T[];
    highlighting?: ISearchResponseHighlighting;
    facetCounts?: ISearchResponseFacetCounts;
    nextCursorId?: string;
}

export {
    ISearchResponse,
    ISearchResponseHighlighting,
    ISearchResponseFieldHighlighting,
    ISearchResponseFacetCounts
}
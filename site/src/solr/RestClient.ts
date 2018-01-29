
import axios from "axios";

interface IQueryRequest {
    q?: string;
    "q.op"?: string;
    start?: number;
    rows?: number;
    sort?: string;
    indent?: string;
    fl?: string;
    df?: string;
    wt?: string;
    _?: string;
}

interface IQueryResponse {
    numFound?: number;
    start?: number;
    docs?: any[]
}

interface IQueryCallResponseHeader {
    status?: number;
    QTime?: number;
    params?: IQueryRequest;
}

interface IQueryCallResponse {
    responseHeader?: IQueryCallResponseHeader;
    response?: IQueryResponse;
}

const runQuery = (url : string, request : IQueryRequest) : Promise<IQueryCallResponse> => {
    return axios.get(url, {
        params: request
    }).then((res) => {
        return res.data as IQueryCallResponse;
    });
};

export {
    runQuery,
    IQueryRequest,
    IQueryResponse,
    IQueryCallResponse,
    IQueryCallResponseHeader
};
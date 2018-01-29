import axios from "axios";
import { IQueryRequest, IQueryCallResponse } from "./RestClient";
import { UserProfileHandleStore } from "user/UserProfileHandleStore";

interface IDataServiceSolrQuery {
    params: IQueryRequest;
}

interface IDataServiceQueryRequest {
    server?: string;
    port?: string;
    core : string;
    solrQuery: IDataServiceSolrQuery;
}

const runQuery = (url : string, request : IDataServiceQueryRequest, includeIvUser?: boolean) : Promise<IQueryCallResponse> => {
    const r = () => {
        return axios.post(url, request, includeIvUser ? { headers: { "Iv-User": UserProfileHandleStore.value.user.username }} : undefined).then((res) => {
            return res.data as IQueryCallResponse;
        });
    };
    // don't ask
    return includeIvUser ? UserProfileHandleStore.load().then(r) : r();
};

export { IDataServiceQueryRequest, runQuery }
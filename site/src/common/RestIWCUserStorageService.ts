import axios from "axios";
import AbstractRestService from "common/AbstractRestService";
import RestIwcApiConfig from "config/RestIwcApiConfig";
import IStorageService from "./IStorageService";

const ContentType = "application/json";

interface IWCDataResource {
    username?: string;
    key?: string;
    entity?: string;
    content_type?: string;
}

class RestIWCUserStorageService extends AbstractRestService implements IStorageService {
    get config() {
        return this._config || RestIwcApiConfig;
    }
    getItem(key : string) : Promise<any> {
        return axios.get(`${this.config.baseUrl}/self/data/${encodeURIComponent(key)}/`, this.config.auth ? {
            auth: this.config.auth
        } : undefined).then((value) => {
            const resource = value.data as IWCDataResource;
            return JSON.parse(resource.entity);
        }).catch((error) => {
            if(error.response && error.response.status !== 404) {
                throw error;
            }
        });
    }
    setItem(key : string, item : any) : Promise<any> {
        if(!item) {
            return this.removeItem(key);
        }
        const resource : IWCDataResource = { entity: JSON.stringify(item), content_type: ContentType };
        return axios.put(`${this.config.baseUrl}/self/data/${encodeURIComponent(key)}/`, resource, this.config.auth ? {
            auth: this.config.auth
        } : undefined);
    }
    removeItem(key : string) : Promise<any> {
        return axios.delete(`${this.config.baseUrl}/self/data/${encodeURIComponent(key)}/`, this.config.auth ? {
            auth: this.config.auth
        } : undefined);
    }
}

export { RestIWCUserStorageService as default, RestIWCUserStorageService }
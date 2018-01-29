import { AbstractRestService } from "./AbstractRestService";
import RestDataServiceConfig from "config/RestDataServiceConfig";

const NoResultErrorCode: string = "0101";

abstract class AbstractRestDataService extends AbstractRestService {
    get config() {
        return this._config || RestDataServiceConfig;
    }
    protected assertObject(data: any) : any {
        if (data && typeof(data) !== 'object') {
            throw new Error(`UNEXPECTED_RESPONSE_TYPE: Expected response to be an object, but got ${typeof(data)}. Data - ${data}`);
        }
        return data;
    }
    protected handleError(errors : any) : any {
        if(errors.code !== NoResultErrorCode) {
            throw errors;
        }
        return [];
    }
}

export { AbstractRestDataService as default, AbstractRestDataService, NoResultErrorCode };
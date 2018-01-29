import axios from "axios";
import IUserProfile from "./IUserProfile";
import { IUser } from "./IUser";
import { IUserService, IGetUsersRequest } from "./IUserService";
import AbstractRestService from "common/AbstractRestService";
import RestApiConfig from "config/RestApiConfig";

class RestUserService extends AbstractRestService implements IUserService {
    private _promise : Promise<IUserProfile>;
    get config() {
        return this._config || RestApiConfig;
    }
    getUsers(request?: IGetUsersRequest) : Promise<IUser[]> {
        return axios.get(`${this.config.baseUrl}/user/`, { params: request }).then(value => {
            return value.data as IUser[];
        });
    }
    getUserProfile() : Promise<IUserProfile> {
        return axios.get(`${this.config.baseUrl}/self/profile/`).then(value => {
            return value.data as IUserProfile;
        });
    }
}

export {
    RestUserService as default,
    RestUserService
}

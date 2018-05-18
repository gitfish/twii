import { mock as mockListingService } from "../listing/config/mock";
import { mock as mockUserService } from "../user/config/mock";

const mock = (env : any) => {
    mockListingService(env);
    mockUserService(env);
};

export { mock, mock as default }
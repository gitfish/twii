import { rest as restListingService } from "../listing/config/rest";
import { rest as restUserService } from "../user/config/rest";

const rest = (env : any) => {
    restListingService(env);
    restUserService(env);
};

export { rest }
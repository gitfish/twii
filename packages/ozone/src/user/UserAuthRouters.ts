import { IRequest } from "@twii/router/lib/IRequest";
import { IRequestHandler } from "@twii/router/lib/IRequestHandler";
import { IUserProfile } from "./IUserProfile";
import { UserProfileStore } from "./model/UserProfileStore";
import { isAuthorised } from "./UserAuthHelper";

/**
 * Loads a profile for use in the request chain
 */
const requiresUserProfile : IRequestHandler = (req : IRequest, next?: IRequestHandler) => {
    if(!req.userProfile) {
        return UserProfileStore.load().then(() => {
            const nextReq = Object.assign({}, req, { userProfile: UserProfileStore.value });
            next(nextReq);
        });
    }
    next();
};

const requiresAuth = (reqAuthGroup : string) : IRequestHandler => {
    return (req: IRequest, next?: IRequestHandler) : Promise<any> | any => {
        return UserProfileStore.load().then(() => {
            if (!isAuthorised(reqAuthGroup, UserProfileStore.value)) {
                throw { code: "FORBIDDEN", message: "You do not have permission to access this resource", request: req};
            }
            return next();
        });
    }
};

const requiresAuthHandler = (reqAuthGroup : string, handler : IRequestHandler) => {
    return (req: IRequest, next?: IRequestHandler) : Promise<any> | any => {
        return UserProfileStore.load().then(() => {
            if (!isAuthorised(reqAuthGroup, UserProfileStore.value)) {
                throw { code: "FORBIDDEN", message: "You do not have permission to access this resource", request: req};
            }
            return handler(req, next);
        });
    }
};

export {
    requiresUserProfile,
    requiresAuth,
    requiresAuthHandler
}
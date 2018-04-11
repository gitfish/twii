import { IRequest } from "@pu/router/lib/IRequest";
import { IRequestHandler } from "@pu/router/lib/IRequestHandler";
import { IUserProfile } from "./IUserProfile";
import { UserProfileStore } from "./model/UserProfileStore";
import * as StringUtils from "@pu/common/lib/StringUtils";

const isAuthorised = (reqAuthGroup : string, userProfile : IUserProfile) : boolean => {
    return StringUtils.isBlank(reqAuthGroup) ||
        (userProfile && userProfile.user && userProfile.user.groups && userProfile.user.groups.some(group => group.name === reqAuthGroup));
};

/**
 * Loads a profile for use in the request chain
 */
const requiresUser = () : IRequestHandler => {
    return (req : IRequest, next?: IRequestHandler) => {
        if(!req.userProfile) {
            return UserProfileStore.load().then(() => {
                const nextReq = Object.assign({}, req, { userProfile: UserProfileStore.value });
                return next(nextReq);
            });
        }
        return next();
    };
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

export { requiresUser, requiresAuth, requiresAuthHandler, isAuthorised }
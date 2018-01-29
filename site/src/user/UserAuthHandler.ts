import IRequest from "roota/lib/IRequest";
import IRequestHandler from "roota/lib/IRequestHandler";
import IUserProfile from "./IUserProfile";
import * as StringUtils from "util/String";
import UserProfileHandleStore from "./UserProfileHandleStore";

const isAuthorised = (reqAuthGroup : string, userProfile : IUserProfile) : boolean => {
    return StringUtils.isBlank(reqAuthGroup) ||
        (userProfile && userProfile.user && userProfile.user.groups && userProfile.user.groups.some(group => group.name === reqAuthGroup));
};

const requiresUser = () : IRequestHandler => {
    return (req : IRequest, next?: IRequestHandler) => {
        if(!req.userProfile) {
            return UserProfileHandleStore.load().then(() => {
                const nextReq = Object.assign({}, req, { userProfile: UserProfileHandleStore.value});
                return next(nextReq);
            });
        }
        return next();
    };
};

const requiresAuth = (reqAuthGroup : string) : IRequestHandler => {
    return (req: IRequest, next?: IRequestHandler) : Promise<any> | any => {
        return UserProfileHandleStore.load().then(() => {
            if (!isAuthorised(reqAuthGroup, UserProfileHandleStore.value)) {
                throw { code: "FORBIDDEN", message: "You do not have permission to access this resource", request: req};
            }
            return next();
        });
    }
};

const requiresAuthHandler = (reqAuthGroup : string, handler : IRequestHandler) => {
    return (req: IRequest, next?: IRequestHandler) : Promise<any> | any => {
        return UserProfileHandleStore.load().then(() => {
            if (!isAuthorised(reqAuthGroup, UserProfileHandleStore.value)) {
                throw { code: "FORBIDDEN", message: "You do not have permission to access this resource", request: req};
            }
            return handler(req, next);
        });
    }
};

export { requiresUser, requiresAuth, requiresAuthHandler, isAuthorised }
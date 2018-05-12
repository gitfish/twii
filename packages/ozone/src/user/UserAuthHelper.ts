import { IUserProfile } from "./IUserProfile";
import { isBlank} from "@twii/core/lib/StringUtils";

const isAuthorised = (reqAuthGroup : string, userProfile : IUserProfile) : boolean => {
    return isBlank(reqAuthGroup) ||
        (userProfile && userProfile.user && userProfile.user.groups && userProfile.user.groups.some(group => group.name === reqAuthGroup));
};

export { isAuthorised }
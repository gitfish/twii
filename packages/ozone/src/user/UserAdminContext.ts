import { Context } from "@twii/common/lib/Context";
import { IPredicateFunc } from "@twii/common/lib/IPredicateFunc";
import { IUserProfile } from "./IUserProfile";
import { equalsIgnoreCase } from "@twii/common/lib/StringUtils";

const defaultAdminCheck = (userProfile : IUserProfile) => {
    return userProfile.user && userProfile.user.groups && userProfile.user.groups.some(g => {
        return equalsIgnoreCase(g.name, "admin");
    });
};

const UserAdminContext = new Context<IPredicateFunc<IUserProfile>>({
    value: defaultAdminCheck
});

export { UserAdminContext }
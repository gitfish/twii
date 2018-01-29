import IRequestHeader from "./IRequestHeader";
import UserProfileHandleStore from "user/UserProfileHandleStore";
import * as IdUtils from "util/Id";
import packageInfo from "package.json";

const SourceSystemId = "USR";

const getProfileUserId = () : Promise<string> => {
    return UserProfileHandleStore.load().then(() => {
        const userProfile = UserProfileHandleStore.value;
        return userProfile && userProfile.user && userProfile.user.username ? userProfile.user.username : "unknown";
    });
};

const getRequestHeader = (spec?: IRequestHeader) : Promise<IRequestHeader> => {
    const sourceSystemId = spec && spec.sourceSystemId ? spec.sourceSystemId : SourceSystemId
    const timestamp = new Date();
    const userIdPromise : Promise<string> = spec && spec.userId ? Promise.resolve(spec.userId) : getProfileUserId();
    return userIdPromise.then((userId) => {
        return {
            correlationRequestId: `${IdUtils.next(sourceSystemId + "-" + userId + "-")}-${timestamp.getTime()}`,
            requestTimeStamp: timestamp,
            sourceSystemId: sourceSystemId,
            userId: userId
        };
    });
};

export { getRequestHeader }
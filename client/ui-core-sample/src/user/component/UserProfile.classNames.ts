import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IUserProfileStyles } from "./UserProfile.styles";

interface IUserProfileClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IUserProfileStyles, className?: string) => {
    return {
        root: mergeStyles("user-profile", className, styles.root),
    };
});

export { IUserProfileClassNames, getClassNames }
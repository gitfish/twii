import { IAppProps } from "@twii/core-ui/lib/component/IAppProps";
import { IUserProfile } from "../../user/IUserProfile";

interface IOzoneAppProps extends IAppProps {
    userProfile: IUserProfile;
    params: any;
}

export { IOzoneAppProps }
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { IUserProfile } from "../../user/IUserProfile";

interface IOzoneAppProps extends IAppProps {
    userProfile: IUserProfile;
    params: any;
}

export { IOzoneAppProps }
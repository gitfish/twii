import * as React from "react";
import { isAuthorised } from "../UserAuthHelper";
import { UserProfileStore } from "../model/UserProfileStore";
import { IUserProfile } from "../IUserProfile";
import { IUserContainerProps, UserContainer } from "./UserContainer";

interface IUserAuthContainerProps extends IUserContainerProps {
    requiredAuthGroup?: string;
    isAuthorised?: (userProfile : IUserProfile) => boolean;
    onRenderNotAuthorised?: (userProfile : IUserProfile) => React.ReactNode;
}

class UserAuthContainer extends React.Component<IUserAuthContainerProps, any> {
    componentWillMount() {
        UserProfileStore.load();
    }
    private _onRenderUser = (userProfile : IUserProfile) => {
        let authd = false;
        if(this.props.isAuthorised) {
            authd = this.props.isAuthorised(userProfile);
        } else {
            authd = isAuthorised(this.props.requiredAuthGroup, userProfile);
        }

        if(authd) {
            return this.props.onRenderUser(userProfile);
        }
        return this.props.onRenderNotAuthorised ? this.props.onRenderNotAuthorised(userProfile) : null;
    }
    render() {
        return <UserContainer {...this.props} onRenderUser={this._onRenderUser} />
    }
}

export { IUserAuthContainerProps, UserAuthContainer }
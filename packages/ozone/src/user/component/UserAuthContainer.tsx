import * as React from "react";
import { isAuthorised } from "../UserAuthHelper";
import { UserProfileStore } from "../model/UserProfileStore";
import { IUserProfile } from "../IUserProfile";
import { IUserContainerProps, UserContainer } from "./UserContainer";
import { UserAdminContext } from "../UserAdminContext";

interface IUserAuthContainerProps extends IUserContainerProps {
    isAuthorised: (userProfile : IUserProfile) => boolean;
    onRenderNotAuthorised?: (userProfile : IUserProfile) => React.ReactNode;
}

class UserAuthContainer extends React.Component<IUserAuthContainerProps, any> {
    componentWillMount() {
        UserProfileStore.load();
    }
    private _onRenderUser = (userProfile : IUserProfile) => {
        if(this.props.isAuthorised(userProfile)) {
            return this.props.onRenderUser(userProfile);
        }
        return this.props.onRenderNotAuthorised ? this.props.onRenderNotAuthorised(userProfile) : null;
    }
    render() {
        return <UserContainer {...this.props} onRenderUser={this._onRenderUser} />
    }
}

interface IUserAdminContainerProps extends IUserContainerProps {
    onRenderNonAdmin?: (userProfile : IUserProfile) => React.ReactNode;
}

class UserAdminContainer extends React.Component<IUserAdminContainerProps, any> {
    render() {
        return (
            <UserAuthContainer
                    {...this.props}
                    isAuthorised={UserAdminContext.value}
                    onRenderNotAuthorised={this.props.onRenderNonAdmin} />
        );
    }
}

export {
    IUserAuthContainerProps,
    UserAuthContainer,
    IUserAdminContainerProps,
    UserAdminContainer
}
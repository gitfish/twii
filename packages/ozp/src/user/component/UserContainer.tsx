import * as React from "react";
import { isAuthorised } from "../UserAuthHelper";
import { UserProfileStore } from "../model/UserProfileStore";
import { Sync } from "@twii/common/lib/component/Sync";
import { IUserProfile } from "../IUserProfile";

interface IUserContainerProps {
    onRenderUser: (userProfile : IUserProfile) => React.ReactNode;
    onRenderLoadingUserProfile?: () => React.ReactNode;
    onRenderLoadError?: () => React.ReactNode;
}
// Basic container for components that request a user profile before rendering
class UserContainer extends React.Component<IUserContainerProps, any> {
    componentWillMount() {
        UserProfileStore.load();
    }
    private _onRenderDone = () => {
        return this.props.onRenderUser(UserProfileStore.value);
    }
    render() {
        return <Sync sync={UserProfileStore.sync}
                              onRenderDone={this._onRenderDone}
                              onRenderSync={this.props.onRenderLoadingUserProfile}
                              onRenderError={this.props.onRenderLoadError} />;
    }
}

export { IUserContainerProps, UserContainer }
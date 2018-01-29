import * as React from "react";
import { isAuthorised } from "../UserAuthHandler";
import { UserProfileHandleStore } from "../UserProfileHandleStore";
import { SyncContainer } from "common/component/SyncContainer";
import { IUserProfile } from "../IUserProfile";

interface IUserContainerProps {
    onRenderUser: (userProfile : IUserProfile) => React.ReactNode;
    onRenderLoadingUserProfile?: () => React.ReactNode;
    onRenderLoadError?: () => React.ReactNode;
}
// Basic container for components that request a user profile before rendering
class UserContainer extends React.Component<IUserContainerProps, any> {
    componentWillMount() {
        UserProfileHandleStore.load();
    }
    private _onRenderDone = () => {
        return this.props.onRenderUser(UserProfileHandleStore.value);
    }
    render() {
        return <SyncContainer sync={UserProfileHandleStore.sync}
                              onRenderDone={this._onRenderDone}
                              onRenderSync={this.props.onRenderLoadingUserProfile}
                              onRenderError={this.props.onRenderLoadError} />;
    }
}

export { IUserContainerProps, UserContainer }
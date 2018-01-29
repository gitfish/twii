import * as React from "react";
import { observer } from "mobx-react";
import IUserProfileHandleModel from "../IUserProfileHandleModel";
import UserProfileHandleStore from "../UserProfileHandleStore";
import UserProfile from "./UserProfile";
import SyncContainer from "common/component/SyncContainer";

interface IUserProfileProps {
    userProfileHandle: IUserProfileHandleModel;
}

class UserProfileContainer extends React.Component<IUserProfileProps, any> {
    componentWillMount() {
        this.props.userProfileHandle.load();
    }
    private _onRenderDone = () => {
        return <UserProfile userProfile={this.props.userProfileHandle.value} />;
    }
    render() {
        return (
            <div className="user-profile-container">
                <SyncContainer sync={this.props.userProfileHandle.sync} onRenderDone={this._onRenderDone} />
            </div>
        );
    }
}

export { UserProfileContainer as default, UserProfileContainer }
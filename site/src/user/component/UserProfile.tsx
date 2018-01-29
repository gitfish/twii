import * as React from "react";
import { observer } from "mobx-react";
import IUserProfile from "../IUserProfile";
import "./UserProfile.scss";

interface IUserProfileProps {
    userProfile: IUserProfile;
}

@observer
class UserProfile extends React.Component<IUserProfileProps, any> {
    render() {
        if(this.props.userProfile && this.props.userProfile.user) {
            const user = this.props.userProfile.user;
            let groups;
            if (user.groups) {
                groups = this.props.userProfile.user.groups.map((group, index) => {
                    return <li key={index}>{group.name}</li>
                });
            }
            return (
                <div className="user-profile">
                    <div className="user-profile-display-name">{this.props.userProfile.display_name}</div>
                    <div className="user-profile-username">{user.username}</div>
                    <div className="user-profile-email">{user.email}</div>
                    <div className="user-profile-roles-container">
                        <span className="user-profile-roles-label">Roles:</span>
                        <ul className="user-profile-roles-list">
                            {groups}
                        </ul>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export { UserProfile as default, UserProfile }
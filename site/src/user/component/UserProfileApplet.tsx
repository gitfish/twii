import * as React from "react";
import UserProfileContainer from "./UserProfileContainer";
import UserProfileHandleStore from "../UserProfileHandleStore";

class UserProfileApplet extends React.Component<any, any> {
    componentWillMount() {
        this.props.host.setTitle("User Profile");
    }
    render() {
        return (
            <UserProfileContainer userProfileHandle={UserProfileHandleStore} />
        );
    }
}

export { UserProfileApplet as default, UserProfileApplet }
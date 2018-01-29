import * as React from "react";
import { observer } from "mobx-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import UserProfileContainer from "./UserProfileContainer";
import UserProfileToggleStore from "../UserProfileToggleStore";
import UserProfileHandleStore from "../UserProfileHandleStore";

@observer
class UserProfileMenuItem extends React.Component<any, any> {
    private _onToggleClick = () => {
        UserProfileToggleStore.setValue(!UserProfileToggleStore.value);
    }
    private _onDismiss = () => {
        UserProfileToggleStore.setValue(false);
    }
    render() {
        return (
            <div className="user-profile-menu-item">
                <IconButton title="User Profile" className="user-profile-menu-button app-menu-button" iconProps={{ iconName: "Contact" }} onClick={this._onToggleClick} />
                <Panel type={PanelType.medium} isOpen={UserProfileToggleStore.value} headerText="User Profile" onDismiss={this._onDismiss} isLightDismiss={true}>
                    <UserProfileContainer userProfileHandle={UserProfileHandleStore} />
                </Panel>
            </div>
        );
    }
}

export { UserProfileMenuItem as default, UserProfileMenuItem }
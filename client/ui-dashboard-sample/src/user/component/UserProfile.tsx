import * as React from "react";
import { HoverCard, IExpandingCardProps } from "office-ui-fabric-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Callout } from "office-ui-fabric-react/lib/Callout";
import { ClassNames } from "./UserProfile.style";

class UserProfile extends React.Component<any, any> {
    render() {
        return (
            <div className={ClassNames.root}>
                <div className="name">Sample User</div>
                <div className="email">sample.user@ui-sample.com</div>
            </div>
        );
    }
}

class UserProfileMenuItemWithHoverCard extends React.Component<any, any> {
    private _onClick = () => {
        this.setState({ open: !this.state.open });
    }
    private _onCalloutDismiss = () => {
        this.setState({ open: false });
    }
    private _onRenderCompactCard = () => {
        return <UserProfile />;
    }
    render() {
        const expandingCardProps : IExpandingCardProps = {
            onRenderCompactCard: this._onRenderCompactCard
        };
        return (
            <HoverCard instantOpenOnClick={true} expandingCardProps={expandingCardProps}>
                <Icon iconName="Contact" />
            </HoverCard>
        );
    }
}

interface IUserProfileMenuItemWithCalloutState {
    open: boolean;
}

class UserProfileMenuItemWithCallout extends React.Component<any, IUserProfileMenuItemWithCalloutState> {
    private _ref : HTMLElement;
    constructor(props : any) {
        super(props);
        this.state = {
            open: false
        };
    }
    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    private _onClickButton = () => {
        this.setState({ open: !this.state.open });
    }
    private _onDismissCallout = () => {
        this.setState({ open: false });
    }
    render() {
        return (
            <div className="user-profile-menu-item" ref={this._onRef}>
                <IconButton iconProps={{ iconName: "Contact" }} onClick={this._onClickButton} />
                {this.state.open && (
                    <Callout onDismiss={this._onDismissCallout} target={this._ref}>
                        <UserProfile />
                    </Callout>
                )}
            </div>
        );
    }
}

export { UserProfile, UserProfileMenuItemWithHoverCard, UserProfileMenuItemWithCallout }
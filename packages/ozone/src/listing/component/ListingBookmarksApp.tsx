import * as React from "react";
import { ListingBookmarksContainer } from "./ListingBookmarks";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { IListing } from "../IListing";
import { launch } from "../ListingActions";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { AppLink } from "@twii/core-ui/lib/component/AppLink";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { createPlaceItems } from "./ListingMenuHelper";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";

class ListingBookmarksApp extends React.Component<IOzoneAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onSelectListing = (listing : IListing) => {
        launch(this.host, listing);
    }
    componentWillMount() {
        this.host.setTitle("Bookmarks");
    }
    private _onRenderNoBookmarks = () => {
        return (
            <div style={{ padding: 8 }}>
                <MessageBar  messageBarType={MessageBarType.info}>
                    You haven't bookmarked anything. <AppLink host={this.host} request={{ path: "/ozone/store"}}>Take a look in the Store</AppLink>.
                </MessageBar>
            </div>
        );
    }
    render() {
        const placeItems = createPlaceItems({ host: this.host, userProfile: this.userProfile });
        const checkedItem = placeItems.find(item => item.checked);
        
        const placeMenu : IContextualMenuItem = {
            key: "place",
            name: checkedItem.name,
            iconProps: checkedItem.iconProps,
            subMenuProps: {
                items: placeItems
            }
        };
        const items : IContextualMenuItem[] = [
            placeMenu
        ];
        return (
            <HostAppView host={this.host} commandBarProps={{ items: items }}>
                <ListingBookmarksContainer bookmarkList={ListingBookmarkListStore} onSelectListing={this._onSelectListing} onRenderNoBookmarks={this._onRenderNoBookmarks} />
            </HostAppView>
        );
    }
}

export {
    ListingBookmarksApp,
    ListingBookmarksApp as default
}
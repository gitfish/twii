import * as React from "react";
import { ListingBookmarksContainer } from "./ListingBookmarks";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { IListing } from "../IListing";
import { launch } from "../ListingActions";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { AppLink } from "@twii/common-ui/lib/component/AppLink";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

class ListingBookmarksApp extends React.Component<IAppProps, any> {
    private _onSelectListing = (listing : IListing) => {
        launch(this.props.host, listing);
    }
    componentWillMount() {
        this.props.host.setTitle("Add Widget");
    }
    private _onRenderNoBookmarks = () => {
        return (
            <div style={{ padding: 8 }}>
                <MessageBar  messageBarType={MessageBarType.info}>
                    You haven't bookmarked anything. <AppLink host={this.props.host} request={{ path: "/ozone/store"}}>Take a look in the Store</AppLink>.
                </MessageBar>
            </div>
        );
    }
    private _onGoToStore = () => {
        this.props.host.load({ path: "/ozone/store" });
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "bookmarks",
                name: "Bookmarks",
                iconProps: {
                    iconName: "DoubleBookmark"
                }
            },
            {
                key: "store",
                name: "Store",
                iconProps: {
                    iconName: "Shop"
                },
                onClick: this._onGoToStore
            }  
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingBookmarksContainer bookmarkList={ListingBookmarkListStore} onSelectListing={this._onSelectListing} onRenderNoBookmarks={this._onRenderNoBookmarks} />
            </HostAppView>
        );
    }
}

export { ListingBookmarksApp }
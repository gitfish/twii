import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { ListingBookmarksContainer } from "./ListingBookmarks";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { IListing } from "../IListing";
import { launch } from "../ListingActions";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { AppLink } from "@twii/common/lib/component/AppLink";

class ListingBookmarksApp extends React.Component<IAppProps, any> {
    private _onSelectListing = (listing : IListing) => {
        launch(this.props.host, listing);
    }
    componentWillMount() {
        this.props.host.setTitle("Add Widget");
    }
    private _onRenderNoBookmarks = () => {
        return (
            <MessageBar messageBarType={MessageBarType.info}>
                You haven't bookmarked anything. <AppLink host={this.props.host} request={{ path: "/listing/shop"}}>Take a look in the Shop</AppLink>.
            </MessageBar>
        );
    }
    render() {
        return (
            <HostAppView title="Add Widget" host={this.props.host}>
                <ListingBookmarksContainer bookmarkList={ListingBookmarkListStore} onSelectListing={this._onSelectListing} onRenderNoBookmarks={this._onRenderNoBookmarks} />
            </HostAppView>
        );
    }
}

export { ListingBookmarksApp }
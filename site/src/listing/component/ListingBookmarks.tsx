import * as React from "react";
import { observer } from "mobx-react";
import { IListingBookmarksModel } from "../IListingBookmarksModel";
import { IListing } from "../IListing";
import { SyncContainer } from "common/component/SyncContainer";
import { ListingList } from "./ListingList";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { RootAppHost } from "app/RootAppHost";
import { AppLink } from "app/component/AppLink";

interface IListingBookmarksProps {
    bookmarks: IListingBookmarksModel;
    onSelectListing?: (listing : IListing) => void;
}

@observer
class ListingBookmarks extends React.Component<IListingBookmarksProps, any> {
    render() {
        if(this.props.bookmarks.value && this.props.bookmarks.value.length > 0) {
            const listings = this.props.bookmarks.value.map(bookmark => bookmark.listing);
            return <ListingList listings={listings} onSelectItem={this.props.onSelectListing} compact={true} wrapping={true} />;
        }
        // TODO: we'll probably want a message and a link to the listing market here
        return (
            <MessageBar messageBarType={MessageBarType.info}>
                You haven't bookmarked any Widgets. <AppLink host={RootAppHost} request={{ path: "/listing/shop"}}>Take a look in the Shop</AppLink> and bookmark some Widgets.
            </MessageBar>
        );
    }
}

class ListingBookmarksContainer extends React.Component<IListingBookmarksProps, any> {
    componentWillMount() {
        this.props.bookmarks.load();
    }
    private _onRenderDone = () => {
        return <ListingBookmarks {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.bookmarks.sync} onRenderDone={this._onRenderDone} />
    }
}

export {
    IListingBookmarksProps,
    ListingBookmarks,
    ListingBookmarksContainer
}
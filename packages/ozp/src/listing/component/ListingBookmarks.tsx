import * as React from "react";
import { observer } from "mobx-react";
import { IListingBookmarkListModel } from "../model/IListingBookmarkListModel";
import { IListing } from "../IListing";
import { Sync } from "@twii/fabric-ui/lib/component/Sync";
import { ListingList } from "./ListingList";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface IListingBookmarksProps {
    bookmarkList: IListingBookmarkListModel;
    onSelectListing?: (listing : IListing) => void;
    onRenderNoBookmarks?: () => React.ReactNode;
}

@observer
class ListingBookmarks extends React.Component<IListingBookmarksProps, any> {
    render() {
        if(this.props.bookmarkList.value && this.props.bookmarkList.value.length > 0) {
            const listings = this.props.bookmarkList.value.map(bookmark => bookmark.listing);
            return <ListingList listings={listings} onSelectItem={this.props.onSelectListing} compact={true} wrapping={true} />;
        }
        return this.props.onRenderNoBookmarks ? this.props.onRenderNoBookmarks() :
            (
                <MessageBar messageBarType={MessageBarType.warning}>
                    You haven't bookmarked anything.
                </MessageBar>
            );
    }
}

class ListingBookmarksContainer extends React.Component<IListingBookmarksProps, any> {
    componentWillMount() {
        this.props.bookmarkList.load();
    }
    private _onRenderDone = () => {
        return <ListingBookmarks {...this.props} />;
    }
    render() {
        return <Sync sync={this.props.bookmarkList.sync} onRenderDone={this._onRenderDone} />
    }
}

export {
    IListingBookmarksProps,
    ListingBookmarks,
    ListingBookmarksContainer
}
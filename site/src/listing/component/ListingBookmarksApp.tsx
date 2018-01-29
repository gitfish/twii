import * as React from "react";
import { IAppProps } from "app/component/IAppProps";
import { ListingBookmarksContainer } from "./ListingBookmarks";
import { ListingBookmarksStore } from "../ListingBookmarksStore";
import { IListing } from "../IListing";
import { launch } from "../ListingActions";
import { AppHostWrapper } from "app/component/AppHostWrapper";

class ListingBookmarksApp extends React.Component<IAppProps, any> {
    private _onSelectListing = (listing : IListing) => {
        launch(this.props.host, listing);
    }
    componentWillMount() {
        this.props.host.setTitle("Add Widget");
    }
    render() {
        return (
            <AppHostWrapper title="Add Widget" host={this.props.host}>
                <ListingBookmarksContainer bookmarks={ListingBookmarksStore} onSelectListing={this._onSelectListing} />
            </AppHostWrapper>
        );
    }
}

export { ListingBookmarksApp }
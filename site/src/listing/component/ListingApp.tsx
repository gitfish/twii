import * as React from "react";
import { IAppProps } from "app/component/IAppProps";
import { ListingContainer, ListingTitleContainer, ListingDeleteDialog } from "./Listing";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import { findById } from "../ListingFinder";
import { ListingDeleteStore } from "../ListingDeleteStore";

interface IListingAppProps extends IAppProps {
    listingId: number;
}

class ListingApp extends React.Component<IListingAppProps, any> {
    private _onEdit = (listing) => {
        this.props.host.load({ path: `/listing/${listing.id}/edit` });
    }
    private _onDelete = (listing) => {
        ListingDeleteStore.setValue(listing);
    }
    componentWillMount() {
        this.props.host.setTitle("Listing Details");
    }
    render() {
        const handle = findById(this.props.listingId) 
        const title = <ListingTitleContainer listingHandle={handle} />;
        return (
            <AppHostWrapper title={title} host={this.props.host} className="applet-listing-app">
                <ListingDeleteDialog listingHandle={ListingDeleteStore} />
                <ListingContainer listingHandle={handle} onEdit={this._onEdit} onDelete={this._onDelete} />
            </AppHostWrapper>
        );
    }
}

export { ListingApp }


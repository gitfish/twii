import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { ListingListModel } from "../model/ListingListModel";
import { IListing } from "../IListing";
import { ListingReviewListContainer, ListingReviewList } from "./ListingReviewList";
import { ListingReviewListModel } from "../model/ListingReviewListModel";
import { Sync } from "@twii/common/lib/component/Sync";
import { IListingModel } from "../model/IListingModel";
import { ListingSupplierContainer } from "./ListingSupplier";
import { findById } from "../model/ListingFinder";
import { getReviews } from "../model/ListingReviewHelper";
import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";

interface IListingReviewListAppProps extends IAppProps {
    listingId: number;
}

class ListingReviewListApp extends React.Component<IListingReviewListAppProps, any> {
    private _onRenderListing = (listing : IListingModel) => {
        return <ListingReviewListContainer reviewList={getReviews(listing)} />;
    }
    get listingSupplier() : ISyncSupplier<IListingModel> {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.props.listingId);
        });
    }
    render() {
        return (
            <HostAppView host={this.props.host} title="Listing Reviews">
                <ListingSupplierContainer listingSupplier={this.listingSupplier} onRenderListing={this._onRenderListing} />
            </HostAppView>
        );
    }
}

export { IListingReviewListAppProps, ListingReviewListApp }

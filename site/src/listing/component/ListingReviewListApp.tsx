import * as React from "react";
import { IAppProps } from "app/component/IAppProps";
import { AppWrapper } from "app/component/AppWrapper";
import { ListingListModel } from "../ListingListModel";
import { IListing } from "../IListing";
import { ListingReviewListContainer, ListingReviewList } from "./ListingReviewList";
import { ListingReviewListModel } from "../ListingReviewListModel";
import { SyncContainer } from "common/component/SyncContainer";
import { IListingModel } from "../IListingModel";
import { ListingHandleContainer } from "./ListingHandle";
import { findById } from "../ListingFinder";
import { getReviews } from "../ListingReviewHelper";

interface IListingReviewListAppProps extends IAppProps {
    listingId: number;
}

class ListingReviewListApp extends React.Component<IListingReviewListAppProps, any> {
    private _onRenderListing = (listing : IListingModel) => {
        return <ListingReviewListContainer reviewList={getReviews(listing)} />;
    }
    render() {
        const listingHandle = findById(this.props.listingId);
        return (
            <AppWrapper title="Listing Reviews" className="listing-review-list-app">
                <ListingHandleContainer listingHandle={findById(this.props.listingId)} onRenderListing={this._onRenderListing} />
            </AppWrapper>
        );
    }
}

export { ListingReviewListApp }

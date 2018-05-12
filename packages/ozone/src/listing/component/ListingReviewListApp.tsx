import * as React from "react";
import { ListingListModel } from "../model/ListingListModel";
import { IListing } from "../IListing";
import { ListingReviewListContainer, ListingReviewList } from "./ListingReviewList";
import { ListingReviewListModel } from "../model/ListingReviewListModel";
import { IListingModel } from "../model/IListingModel";
import { ListingSupplierContainer } from "./ListingSupplier";
import { findById } from "../model/ListingFinder";
import { getReviews } from "../model/ListingReviewHelper";
import { ISyncSupplier } from "@twii/core/lib/ISyncSupplier";
import { IAppProps } from "@twii/core-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

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
        const items : IContextualMenuItem[] = [
            {
                key: "title",
                name: "Listing Reviews"
            }  
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingSupplierContainer listingSupplier={this.listingSupplier} onRenderListing={this._onRenderListing} />
            </HostAppView>
        );
    }
}

export { IListingReviewListAppProps, ListingReviewListApp }

import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { ListingContainer, ListingTitleContainer, ListingDeleteDialog } from "./Listing";
import { findById } from "../model/ListingFinder";
import { ListingDeleteStore } from "../model/ListingDeleteStore";
import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { IListingModel } from "../model/IListingModel";

interface IListingAppProps extends IAppProps {
    listingId: number;
}

class ListingApp extends React.Component<IListingAppProps, any> {
    private _titleSetDisposer : IReactionDisposer;
    private _onEdit = (listing) => {
        this.props.host.load({ path: `/listing/${listing.id}/edit` });
    }
    private _onDelete = (listing) => {
        ListingDeleteStore.setValue(listing);
    }
    get listingSupplier() : ISyncSupplier<IListingModel> {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.props.listingId);
        });
    }
    componentWillMount() {
        this._titleSetDisposer = autorun(() => {
            this.props.host.setTitle(this.listingSupplier.sync.syncing ? "Loading..." : this.listingSupplier.value ? this.listingSupplier.value.title : undefined);
        });
    }
    componentWillUnount() {
        if(this._titleSetDisposer) {
            this._titleSetDisposer();
            delete this._titleSetDisposer;
        }
    }
    render() {
        return (
            <HostAppView title="Listing Details" host={this.props.host}>
                <ListingDeleteDialog listingSupplier={ListingDeleteStore} />
                <ListingContainer listingSupplier={this.listingSupplier} onEdit={this._onEdit} onDelete={this._onDelete} />
            </HostAppView>
        );
    }
}

export { IListingAppProps, ListingApp }


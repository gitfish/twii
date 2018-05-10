import * as React from "react";
import { observer } from "mobx-react";
import { autorun, IReactionDisposer } from "mobx";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { ListingContainer, ListingTitleContainer, ListingDeleteDialog } from "./Listing";
import { findById } from "../model/ListingFinder";
import { ListingDeleteStore } from "../model/ListingDeleteStore";
import { IListingModel } from "../model/IListingModel";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { createPlaceMenu, createPlaceItems, createPlaceItem, createListingPlaceItem } from "./ListingMenuHelper";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";

@observer
class ListingApp extends React.Component<IOzoneAppProps, any> {
    private _titleSetDisposer : IReactionDisposer;
    private _onEdit = (listing) => {
        this.props.host.load({ path: `/ozone/listings/${listing.id}/edit` });
    }
    private _onDelete = (listing) => {
        ListingDeleteStore.setValue(listing);
    }
    private _onOpen = (listing) => {
        this.props.host.open({ path: `/ozone/listings/${listing.id}/launch` });
    }
    private _onRefresh = () => {
        this.listingSupplier.refresh();
    }
    get listingId() {
        return this.props.params.listingId;
    }
    get listingSupplier() : IListingModelSupplier {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.listingId); 
        }, s => s.listingId !== this.listingId);
    }
    componentWillMount() {
        this._titleSetDisposer = autorun(() =>
            this.props.host.setTitle(this.listingSupplier.sync.syncing ? "Loading..." : this.listingSupplier.value ? `${this.listingSupplier.value.title} Listing` : undefined)
        );
    }
    componentWillUnount() {
        if(this._titleSetDisposer) {
            this._titleSetDisposer();
            delete this._titleSetDisposer;
        }
    }
    render() {
        const placeItems = createPlaceItems(this.props);
        const listingDetailsItem = createListingPlaceItem({
            key: "listingDetails",
            host: this.props.host,
            path: this.props.host.path,
            listingSupplier: this.listingSupplier,
            onRenderTitle: s => `${s.value.title} - Details`
        });
        placeItems.unshift({
            key: "sep",
            name: "-"
        });
        placeItems.unshift(listingDetailsItem);
        const items : IContextualMenuItem[] = [
            createPlaceMenu(this.props, placeItems)
        ];
        const farItems : IContextualMenuItem[] = [
            {
                key: "refresh",
                name: "Refresh",
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.listingSupplier.sync.syncing
            }
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingDeleteDialog listingSupplier={ListingDeleteStore} />
                <ListingContainer listingSupplier={this.listingSupplier} onEdit={this._onEdit} onDelete={this._onDelete} onOpen={this._onOpen} />
            </HostAppView>
        );
    }
}

export {
    ListingApp,
    ListingApp as default
}


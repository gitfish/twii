import * as React from "react";
import { observer } from "mobx-react";
import { autorun, IReactionDisposer } from "mobx";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { ListingContainer, ListingTitleContainer, ListingDeleteDialog } from "./Listing";
import { findById } from "../model/ListingFinder";
import { ListingDeleteStore } from "../model/ListingDeleteStore";
import { IListingModel } from "../model/IListingModel";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { createPlaceMenu, createPlaceItems, createPlaceItem, createListingPlaceItem } from "./ListingMenuHelper";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";

@observer
class ListingApp extends React.Component<IOzoneAppProps, any> {
    private _titleSetDisposer : IReactionDisposer;
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    get listingId() {
        return this.props.match.params.listingId;
    }
    private _onEdit = (listing) => {
        this.host.load({ path: `/ozone/listings/${listing.id}/edit` });
    }
    private _onDelete = (listing) => {
        ListingDeleteStore.setValue(listing);
    }
    private _onOpen = (listing) => {
        this.host.open({ path: `/ozone/listings/${listing.id}/launch` });
    }
    private _onRefresh = () => {
        this.listingSupplier.refresh();
    }
    get listingSupplier() : IListingModelSupplier {
        return this.host.getState("listingSupplier", () => {
            return findById(this.listingId); 
        }, s => s.listingId !== this.listingId);
    }
    componentWillMount() {
        this._titleSetDisposer = autorun(() =>
            this.host.setTitle(this.listingSupplier.sync.syncing ? "Loading..." : this.listingSupplier.value ? `${this.listingSupplier.value.title} Listing` : undefined)
        );
    }
    componentWillUnount() {
        if(this._titleSetDisposer) {
            this._titleSetDisposer();
            delete this._titleSetDisposer;
        }
    }
    render() {
        const placeItems = createPlaceItems({ host: this.host, userProfile: this.userProfile });
        const listingDetailsItem = createListingPlaceItem({
            key: "listingDetails",
            host: this.host,
            path: this.host.path,
            listingSupplier: this.listingSupplier,
            onRenderTitle: s => `${s.value.title} - Details`
        });
        placeItems.unshift({
            key: "sep",
            name: "-"
        });
        placeItems.unshift(listingDetailsItem);
        const items : IContextualMenuItem[] = [
            createPlaceMenu({ host: this.host, userProfile: this.userProfile, placeItems: placeItems })
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
            <HostAppView host={this.host} commandBarProps={{ items: items, farItems: farItems }}>
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


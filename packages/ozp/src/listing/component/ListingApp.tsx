import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { ListingContainer, ListingTitleContainer, ListingDeleteDialog } from "./Listing";
import { findById } from "../model/ListingFinder";
import { ListingDeleteStore } from "../model/ListingDeleteStore";
import { IListingModel } from "../model/IListingModel";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

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
    private _onOpen = (listing) => {
        this.props.host.open({ path: `/listing/${listing.id}/launch` });
    }
    get listingSupplier() : IListingModelSupplier {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.props.listingId); 
        }, s => s.listingId !== this.props.listingId);
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
    private _onGoToBookmarks = () => {
        this.props.host.load({ path: "/listing/bookmark" });
    }
    private _onGoToStore = () => {
        this.props.host.load({ path: "/listing/storefront" });
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "bookmarks",
                name: "Bookmarks",
                iconProps: {
                    iconName: "DoubleBookmark"
                },
                onClick: this._onGoToBookmarks
            },
            {
                key: "backToStore",
                name: "Store",
                iconProps: {
                    iconName: "Shop"
                },
                onClick: this._onGoToStore
            }  
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingDeleteDialog listingSupplier={ListingDeleteStore} />
                <ListingContainer listingSupplier={this.listingSupplier} onEdit={this._onEdit} onDelete={this._onDelete} onOpen={this._onOpen} />
            </HostAppView>
        );
    }
}

export { IListingAppProps, ListingApp }


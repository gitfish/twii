import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { IAppProps } from "@pu/common-ui/lib/component/IAppProps";
import { HostAppView } from "@pu/fabric-ui/lib/component/HostAppView";
import { ListingContainer, ListingTitleContainer, ListingDeleteDialog } from "./Listing";
import { findById } from "../model/ListingFinder";
import { ListingDeleteStore } from "../model/ListingDeleteStore";
import { ISyncSupplier } from "@pu/common/lib/ISyncSupplier";
import { IListingModel } from "../model/IListingModel";
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
    get listingSupplier() : ISyncSupplier<IListingModel> {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.props.listingId);
        });
    }
    componentWillMount() {
        this._titleSetDisposer = autorun(() => {
            this.props.host.setTitle(this.listingSupplier.sync.syncing ? "Loading..." : this.listingSupplier.value ? `${this.listingSupplier.value.title} Listing` : undefined);
        });
    }
    componentWillUnount() {
        if(this._titleSetDisposer) {
            this._titleSetDisposer();
            delete this._titleSetDisposer;
        }
    }
    private _onClickBackToStore = () => {
        this.props.host.load({ path: "/listing/storefront" });
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "backToStore",
                name: "Store",
                iconProps: {
                    iconName: "Shop"
                },
                onClick: this._onClickBackToStore
            }  
        ];
        return (
            <HostAppView host={this.props.host} items={items}>
                <ListingDeleteDialog listingSupplier={ListingDeleteStore} />
                <ListingContainer listingSupplier={this.listingSupplier} onEdit={this._onEdit} onDelete={this._onDelete} onOpen={this._onOpen} />
            </HostAppView>
        );
    }
}

export { IListingAppProps, ListingApp }


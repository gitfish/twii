import * as React from "react";
import { observer } from "mobx-react";
import { ListingFormContainer } from "./ListingForm";
import { findById } from "../model/ListingFinder";
import { ListingTitleContainer } from "./Listing";
import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { IListingModel } from "../model/IListingModel";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { autorun, IReactionDisposer } from "mobx";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { createPlaceItems, createPlaceItem, createPlaceMenu, createListingPlaceItem } from "./ListingMenuHelper";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

@observer
class ListingEditApp extends React.Component<IOzoneAppProps, any> {
    private _titleSetDisposer : IReactionDisposer;
    private _onBackToListing = () => {
        this.props.host.load({ path: `/ozone/listings/${this.listingId}` });
    }
    private _onSave = (listing : IListingModel) => {
        listing.save().then(this._onBackToListing).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onSaveImmediate = () => {
        this._onSave(this.listingSupplier.value);
    }
    private _onSubmitForApproval = (listing : IListingModel) => {
        listing.submitForApproval().then(this._onBackToListing).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onCancel = () => {
        this.props.host.load({ path: `/ozone/listings/${this.listingId}` });
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
        const placeItems = createPlaceItems(this.props);
        const listingDetailsItem = createListingPlaceItem({
            key: "listingDetails",
            host: this.props.host,
            path: `/ozone/listings/${encodeURIComponent(this.listingId)}`,
            listingSupplier: this.listingSupplier,
            onRenderTitle: s => `${s.value.title} - Details`
        });
        const listingEditItem = createListingPlaceItem({
            key: "listingEdit",
            host: this.props.host,
            path: this.props.host.path,
            listingSupplier: this.listingSupplier,
            onRenderTitle: s => `${s.value.title} - Edit`
        });
        placeItems.unshift({
            key: "sep",
            name: "-"
        });
        placeItems.unshift(listingDetailsItem);
        placeItems.unshift(listingEditItem);
        const items : IContextualMenuItem[] = [
            createPlaceMenu(this.props, placeItems),
            {
                key: "cancel",
                name: "Cancel",
                iconProps: {
                    iconName: "Cancel"
                },
                onClick: this._onCancel
            },
            {
                key: "save",
                name: "Save",
                iconProps: {
                    iconName: "Save"
                },
                disabled: this.listingSupplier.sync.syncing,
                onClick: this._onSaveImmediate
            }
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingFormContainer listingSupplier={this.listingSupplier}
                                      onSave={this._onSave}
                                      onSubmitForApproval={this._onSubmitForApproval}
                                      onCancel={this._onCancel} />
            </HostAppView>
        );
    }
}

export {
    ListingEditApp,
    ListingEditApp as default
}


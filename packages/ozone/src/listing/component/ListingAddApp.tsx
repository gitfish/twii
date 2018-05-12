import * as React from "react";
import { ListingForm } from "./ListingForm";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { IListingModel } from "../model/IListingModel";
import { ListingModel } from "../model/ListingModel";
import { findById } from "../model/ListingFinder";
import { createPlaceItems, createPlaceItem, createPlaceMenu } from "./ListingMenuHelper";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";

interface IListingAddAppProps extends IOzoneAppProps {
    from?: string;
}

class ListingAddApp extends React.Component<IListingAddAppProps, any> {
    private _listing : ListingModel;
    private _onSave = (listing : IListingModel) => {
        listing.save().then(() => {
            this.props.host.load({ path: `/ozone/listings/${listing.id}`});
        }).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onSaveImmediate = () => {
        this._onSave(this._listing);
    }
    private _onSubmitForApproval = (listing : IListingModel) => {
        listing.submitForApproval().then(() => {
            this.props.host.load({ path: `/ozone/listings/${listing.id}`});
        }).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onCancel = () => {
        if(this.props.from === "list") {
            this.props.host.load({ path: "/ozone/listings" });
        } else {
            this.props.host.load({ path: "/ozone/store" });
        }
    }
    componentWillMount() {
        this.props.host.setTitle("Add Listing");
    }
    render() {
        this._listing = new ListingModel();
        const placeItems = createPlaceItems(this.props);
        const addItem = createPlaceItem(this.props.host, {
            key: "add",
            name: "Add Listing",
            path: this.props.host.path,
            iconProps: {
                iconName: "Add"
            }
        });
        placeItems.unshift({
            key: "sep",
            name: "-"
        });
        placeItems.unshift(addItem);
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
                disabled: this._listing.saveSync.syncing,
                onClick: this._onSaveImmediate
            }
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingForm listing={this._listing}
                             onSave={this._onSave}
                             onSubmitForApproval={this._onSubmitForApproval}
                             onCancel={this._onCancel} />
            </HostAppView>
        );
    }
}

export { 
    IListingAddAppProps,
    ListingAddApp,
    ListingAddApp as default
}


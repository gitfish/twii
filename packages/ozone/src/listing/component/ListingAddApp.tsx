import * as React from "react";
import { ListingForm } from "./ListingForm";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { IListingModel } from "../model/IListingModel";
import { ListingModel } from "../model/ListingModel";
import { findById } from "../model/ListingFinder";
import { createPlaceItems, createPlaceItem, createPlaceMenu } from "./ListingMenuHelper";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";

class ListingAddApp extends React.Component<IOzoneAppProps, any> {
    private _listing : ListingModel;
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onSave = (listing : IListingModel) => {
        listing.save().then(() => {
            this.host.load({ path: `/ozone/listings/${listing.id}`});
        }).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onSaveImmediate = () => {
        this._onSave(this._listing);
    }
    private _onSubmitForApproval = (listing : IListingModel) => {
        listing.submitForApproval().then(() => {
            this.host.load({ path: `/ozone/listings/${listing.id}`});
        }).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onCancel = () => {
        if(this.props.match.params.from === "list") {
            this.host.load({ path: "/ozone/listings" });
        } else {
            this.host.load({ path: "/ozone/store" });
        }
    }
    componentWillMount() {
        this.host.setTitle("Add Listing");
    }
    render() {
        this._listing = new ListingModel();
        const placeItems = createPlaceItems({ host: this.host, userProfile: this.userProfile });
        const addItem = createPlaceItem(this.host, {
            key: "add",
            name: "Add Listing",
            path: this.host.path,
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
            createPlaceMenu({ host: this.host, userProfile: this.userProfile, placeItems: placeItems }),
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
            <HostAppView host={this.host} commandBarProps={{ items: items }}>
                <ListingForm listing={this._listing}
                             onSave={this._onSave}
                             onSubmitForApproval={this._onSubmitForApproval}
                             onCancel={this._onCancel} />
            </HostAppView>
        );
    }
}

export {
    ListingAddApp,
    ListingAddApp as default
}


import * as React from "react";
import { ListingFormContainer } from "./ListingForm";
import { findById } from "../model/ListingFinder";
import { ListingTitleContainer } from "./Listing";
import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { IListingModel } from "../model/IListingModel";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { autorun, IReactionDisposer } from "mobx";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";

interface IListingEditAppProps extends IAppProps {
    listingId: number;
}

class ListingEditApp extends React.Component<IListingEditAppProps, any> {
    private _titleSetDisposer : IReactionDisposer;
    private _onAfterSave = () => {
        this.props.host.load({ path: `/ozone/listing/${this.props.listingId}` });
    }
    private _onCancel = () => {
        this.props.host.load({ path: `/ozone/listing/${this.props.listingId}` });
    }
    get listingSupplier() : IListingModelSupplier {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.props.listingId); 
        }, s => s.listingId !== this.props.listingId);
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
            <HostAppView host={this.props.host}>
                <ListingFormContainer listingSupplier={findById(this.props.listingId)} onAfterSave={this._onAfterSave} onCancel={this._onCancel} />
            </HostAppView>
        );
    }
}

export { IListingEditAppProps, ListingEditApp }


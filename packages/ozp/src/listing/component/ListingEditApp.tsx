import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { ListingFormContainer } from "./ListingForm";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { findById } from "../model/ListingFinder";
import { ListingTitleContainer } from "./Listing";
import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { IListingModel } from "../model/IListingModel";
import { autorun, IReactionDisposer } from "mobx";

interface IListingEditAppProps extends IAppProps {
    listingId: number;
}

class ListingEditApp extends React.Component<IListingEditAppProps, any> {
    private _titleSetDisposer : IReactionDisposer;
    private _onAfterSave = () => {
        this.props.host.load({ path: `/listing/${this.props.listingId}` });
    }
    private _onCancel = () => {
        this.props.host.load({ path: `/listing/${this.props.listingId}` });
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
            <HostAppView host={this.props.host}>
                <ListingFormContainer listingSupplier={findById(this.props.listingId)} onAfterSave={this._onAfterSave} onCancel={this._onCancel} />
            </HostAppView>
        );
    }
}

export { IListingEditAppProps, ListingEditApp }


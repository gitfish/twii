import * as React from "react";
import { ListingForm } from "./ListingForm";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { IListingModel } from "../model/IListingModel";
import { ListingModel } from "../model/ListingModel";
import { findById } from "../model/ListingFinder";

interface IListingAddAppProps extends IAppProps {
    from?: string;
}

class ListingAddApp extends React.Component<IListingAddAppProps, any> {
    private _onAfterSave = (listing : IListingModel) => {
        this.props.host.load({ path: `/ozone/listings/${listing.id}`});
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
        return (
            <HostAppView host={this.props.host} className="listing-add-applet">
                <ListingForm listing={new ListingModel()} onAfterSave={this._onAfterSave} onCancel={this._onCancel} />
            </HostAppView>
        );
    }
}

export { IListingAddAppProps, ListingAddApp }


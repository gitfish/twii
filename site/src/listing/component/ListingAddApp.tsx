import * as React from "react";
import { IAppProps } from "app/component/IAppProps";
import { ListingForm } from "./ListingForm";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import { IListingModel } from "../IListingModel";
import { ListingModel } from "../ListingModel";
import { findById } from "../ListingFinder";

interface IListingAddAppProps extends IAppProps {
    from?: string;
}

class ListingAddApp extends React.Component<IListingAddAppProps, any> {
    private _onAfterSave = (listing : IListingModel) => {
        this.props.host.load({ path: `/listing/${listing.id}`});
    }
    private _onCancel = () => {
        if(this.props.from === "list") {
            this.props.host.load({ path: "/listing" });
        } else {
            this.props.host.load({ path: "/listing/shop" });
        }
    }
    componentWillMount() {
        this.props.host.setTitle("Add New Listing");
    }
    render() {
        return (
            <AppHostWrapper title="Add New Listing" host={this.props.host} className="listing-add-applet">
                <ListingForm listing={new ListingModel()} onAfterSave={this._onAfterSave} onCancel={this._onCancel} />
            </AppHostWrapper>
        );
    }
}

export { ListingAddApp }


import * as React from "react";
import { ListingForm } from "./ListingForm";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IListingModel } from "../model/IListingModel";
import { ListingModel } from "../model/ListingModel";
import { findById } from "../model/ListingFinder";

interface IListingAddAppProps extends IAppProps {
    from?: string;
}

class ListingAddApp extends React.Component<IListingAddAppProps, any> {
    private _onAfterSave = (listing : IListingModel) => {
        this.props.host.load({ path: `/ozone/listing/${listing.id}`});
    }
    private _onCancel = () => {
        if(this.props.from === "list") {
            this.props.host.load({ path: "/ozone/listing" });
        } else {
            this.props.host.load({ path: "/ozone/listing/storefront" });
        }
    }
    componentWillMount() {
        this.props.host.setTitle("Add New Listing");
    }
    render() {
        const items : IContextualMenuItem[] = [
            { key: "title", name: "Add New Listing" }
        ];
        return (
            <HostAppView host={this.props.host} className="listing-add-applet" commandBarProps={{ items: items }}>
                <ListingForm listing={new ListingModel()} onAfterSave={this._onAfterSave} onCancel={this._onCancel} />
            </HostAppView>
        );
    }
}

export { IListingAddAppProps, ListingAddApp }


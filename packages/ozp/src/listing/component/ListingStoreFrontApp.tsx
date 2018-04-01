import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { IListing } from "../IListing";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { ListingStoreFrontContainer } from "./ListingStoreFront";
import { ListingStoreFrontModel } from "../model/ListingStoreFrontModel";

class ListingStoreFrontApp extends React.Component<IAppProps, any> {
    private _onSelectItem = (listing : IListing) => {
        this.props.host.load({ path: `/listing/${listing.id}`});
    }
    private _onAdd = () => {
        this.props.host.load({ path: "/listing/add" });
    }
    private _onShowAllListings = () => {
        this.props.host.load({ path: "/listing" });
    }
    get listingStoreFront() {
        let r = this.props.host.state.listingStoreFront;
        if(!r) {
            r = new ListingStoreFrontModel();
            this.props.host.setState({ listingStoreFront: r });
        }
        return r;
    }
    componentWillMount() {
        this.props.host.setTitle("Shop");
    }
    render() {
        return (
            <HostAppView host={this.props.host} title="Shop">
                <ListingStoreFrontContainer storeFront={this.listingStoreFront}
                                            onSelectItem={this._onSelectItem}
                                            onAdd={this._onAdd}
                                            onShowAllListings={this._onShowAllListings} />
            </HostAppView>
        );
    }
}

export { ListingStoreFrontApp }
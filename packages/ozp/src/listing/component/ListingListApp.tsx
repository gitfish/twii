import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { ListingListModel } from "../model/ListingListModel";
import { IListing } from "../IListing";
import { ListingListPage } from "./ListingListPage";

class ListingListApp extends React.Component<IAppProps, any> {
    private _onSelectItem = (item : IListing) => {
        this.props.host.load({ path: `/listing/${item.id}` });
    }
    private _onShowStore = () => {
        this.props.host.load({ path: "/listing/shop" });
    }
    private _onAdd = () => {
        this.props.host.load({ path: "/listing/add", query: { from: "list" } });
    }
    get listings() {
        let listings = this.props.host.state.listings;
        if(!listings) {
            listings = new ListingListModel();
            this.props.host.setState({ listings: listings });
        }
        return listings;
    }
    componentWillMount() {
        // we deliberately refresh here
        this.listings.load();
    }
    render() {
        return (
            <HostAppView host={this.props.host} title="Listings" className="listing-list-app">
                <ListingListPage listings={this.listings} onSelectItem={this._onSelectItem} compact={true} wrapping={true} onAdd={this._onAdd} onShowStore={this._onShowStore} />
            </HostAppView>
        );
    }
}

export { ListingListApp }

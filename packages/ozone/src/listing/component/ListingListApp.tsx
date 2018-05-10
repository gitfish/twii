import * as React from "react";
import { observer } from "mobx-react";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { ListingListModel } from "../model/ListingListModel";
import { IListing } from "../IListing";
import { ListingListPage } from "./ListingListPage";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { createPlaceMenu } from "./ListingMenuHelper";

@observer
class ListingListApp extends React.Component<IOzoneAppProps, any> {
    private _onSelectItem = (item : IListing) => {
        this.props.host.load({ path: `/ozone/listings/${item.id}` });
    }
    private _onAdd = () => {
        this.props.host.load({ path: "/ozone/listings/add", query: { from: "list" } });
    }
    private _onRefresh = () =>{
        this.listings.refresh();
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
        const items : IContextualMenuItem[] = [
            createPlaceMenu(this.props),
            {
                key: "add",
                name: "Add Listing",
                iconProps: {
                    iconName: "Add"
                },
                onClick: this._onAdd
            }
        ];
        const farItems : IContextualMenuItem[] = [
            {
                key: "refresh",
                name: "Refresh",
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.listings.sync.syncing
            }
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingListPage listings={this.listings} onSelectItem={this._onSelectItem} compact={true} wrapping={true} />
            </HostAppView>
        );
    }
}

export {
    ListingListApp,
    ListingListApp as default
}

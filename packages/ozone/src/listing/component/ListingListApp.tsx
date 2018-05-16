import * as React from "react";
import { observer } from "mobx-react";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { ListingListModel } from "../model/ListingListModel";
import { IListing } from "../IListing";
import { ListingListPage } from "./ListingListPage";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { createPlaceMenu } from "./ListingMenuHelper";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";

@observer
class ListingListApp extends React.Component<IOzoneAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onSelectItem = (item : IListing) => {
        this.host.load({ path: `/ozone/listings/${item.id}` });
    }
    private _onAdd = () => {
        this.host.load({ path: "/ozone/listings/add", query: { from: "list" } });
    }
    private _onRefresh = () =>{
        this.listings.refresh();
    }
    get listings() {
        let listings = this.host.state.listings;
        if(!listings) {
            listings = new ListingListModel();
            this.host.setState({ listings: listings });
        }
        return listings;
    }
    componentWillMount() {
        // we deliberately refresh here
        this.listings.load();
    }
    render() {
        const items : IContextualMenuItem[] = [
            createPlaceMenu({ host: this.host, userProfile: this.userProfile }),
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
            <HostAppView host={this.host} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingListPage listings={this.listings} onSelectItem={this._onSelectItem} compact={true} wrapping={true} />
            </HostAppView>
        );
    }
}

export {
    ListingListApp,
    ListingListApp as default
}

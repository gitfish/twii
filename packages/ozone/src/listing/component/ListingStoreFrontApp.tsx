import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { ListingStoreFrontContainer } from "./ListingStoreFront";
import { ListingStoreFrontModel } from "../model/ListingStoreFrontModel";
import { IAppProps } from "@twii/core-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { UserAdminContext } from "../../user/UserAdminContext";
import { createPlaceMenu } from "./ListingMenuHelper";

@observer
class ListingStoreFrontApp extends React.Component<IOzoneAppProps, any> {
    private _onSelectItem = (listing : IListing) => {
        this.props.host.load({ path: `/ozone/listings/${listing.id}`});
    }
    private _onAdd = () => {
        this.props.host.load({ path: "/ozone/listings/add" });
    }
    private _onRefresh = () =>{
        this.listingStoreFront.refresh();
    }
    get listingStoreFront() {
        return this.props.host.getState("listingStoreFront", () => {
            return new ListingStoreFrontModel(); 
        });
    }
    componentWillMount() {
        this.props.host.setTitle("Store");
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
                disabled: this.listingStoreFront.sync.syncing
            }
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingStoreFrontContainer storeFront={this.listingStoreFront}
                                            onSelectItem={this._onSelectItem} />
            </HostAppView>
        );
    }
}

export {
    ListingStoreFrontApp,
    ListingStoreFrontApp as default
}
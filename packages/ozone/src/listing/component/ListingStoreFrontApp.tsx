import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { ListingStoreFrontContainer } from "./ListingStoreFront";
import { ListingStoreFrontModel } from "../model/ListingStoreFrontModel";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { UserAdminContext } from "../../user/UserAdminContext";

@observer
class ListingStoreFrontApp extends React.Component<IOzoneAppProps, any> {
    private _onSelectItem = (listing : IListing) => {
        this.props.host.load({ path: `/ozone/listings/${listing.id}`});
    }
    private _onAdd = () => {
        this.props.host.load({ path: "/ozone/listings/add" });
    }
    private _onShowAllListings = () => {
        this.props.host.load({ path: "/ozone/listings" });
    }
    private _onRefresh = () =>{
        this.listingStoreFront.refresh();
    }
    get listingStoreFront() {
        return this.props.host.getState("listingStoreFront", () => {
            return new ListingStoreFrontModel(); 
        });
    }
    private _onGoToBookmarks = () => {
        this.props.host.load({ path: "/ozone/bookmarks" });
    }
    componentWillMount() {
        this.props.host.setTitle("Store");
    }
    render() {
        const locationItems : IContextualMenuItem[] = [
            {
                key: "bookmarks",
                name: "Bookmarks",
                iconProps: {
                    iconName: "DoubleBookmark"
                },
                onClick: this._onGoToBookmarks,
                canCheck: true
            },
            {
                key: "store",
                name: "Store",
                iconProps: {
                    iconName: "Shop"
                },
                canCheck: true,
                checked: true
            }
        ];
        if(UserAdminContext.value(this.props.userProfile)) {
            locationItems.push({
                key: "allListings",
                name: "All Listings",
                iconProps: {
                    iconName: "ViewAll"
                },
                onClick: this._onShowAllListings,
                canCheck: true
            })
        }
        const locationItem : IContextualMenuItem = {
            key: "location",
            name: "Store",
            subMenuProps: {
                items: locationItems
            }
        };
        const items : IContextualMenuItem[] = [
            locationItem,
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

export { ListingStoreFrontApp }
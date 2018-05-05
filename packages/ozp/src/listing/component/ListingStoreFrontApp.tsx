import * as React from "react";
import { IListing } from "../IListing";
import { ListingStoreFrontContainer } from "./ListingStoreFront";
import { ListingStoreFrontModel } from "../model/ListingStoreFrontModel";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

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
        return this.props.host.getState("listingStoreFront", () => {
            return new ListingStoreFrontModel(); 
        });
    }
    private _onGoToBookmarks = () => {
        this.props.host.load({ path: "/listing/bookmark" });
    }
    componentWillMount() {
        this.props.host.setTitle("Store");
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "bookmarks",
                name: "Bookmarks",
                iconProps: {
                    iconName: "DoubleBookmark"
                },
                onClick: this._onGoToBookmarks
            },
            {
                key: "store",
                name: "Store",
                iconProps: {
                    iconName: "Shop"
                }
            }  
        ];
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingStoreFrontContainer storeFront={this.listingStoreFront}
                                            onSelectItem={this._onSelectItem}
                                            onAdd={this._onAdd}
                                            onShowAllListings={this._onShowAllListings} />
            </HostAppView>
        );
    }
}

export { ListingStoreFrontApp }
import * as React from "react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { RootAppHost } from "app/RootAppHost";

class ListingStoreAppMenuItem extends React.Component<any, any> {
    private _onClick = () => {
        RootAppHost.load({ path: "/listing/shop" });
    }
    render() {
        return <IconButton title="Shop" className="listing-store-app-menu-item app-menu-button" iconProps={{ iconName: "Shop"}} onClick={this._onClick} />;
    }
}

export { ListingStoreAppMenuItem }
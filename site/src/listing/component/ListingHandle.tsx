import * as React from "react";
import { SyncContainer } from "common/component/SyncContainer";
import { ISyncHandle } from "common/ISyncHandle";
import { IListingModel } from "../IListingModel";

class IListingHandleProps {
    listingHandle?: ISyncHandle<IListingModel>;
    onRenderListing: (listing : IListingModel) => React.ReactNode;
}

class ListingHandleContainer extends React.Component<IListingHandleProps, any> {
    private _onRenderDone = () => {
        return this.props.onRenderListing(this.props.listingHandle.value);
    }
    render() {
        return <SyncContainer sync={this.props.listingHandle.sync} onRenderDone={this._onRenderDone} />;
    }
}

export { IListingHandleProps, ListingHandleContainer }
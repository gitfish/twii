import * as React from "react";
import { IAppProps } from "app/component/IAppProps";
import { ListingFormContainer } from "./ListingForm";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import { findById } from "../ListingFinder";
import { ListingTitleContainer } from "./Listing";

interface IListingEditAppletProps extends IAppProps {
    listingId: number;
}

class ListingEditApplet extends React.Component<IListingEditAppletProps, any> {
    private _onAfterSave = () => {
        this.props.host.load({ path: `/listing/${this.props.listingId}` });
    }
    private _onCancel = () => {
        this.props.host.load({ path: `/listing/${this.props.listingId}` });
    }
    render() {
        const title = <ListingTitleContainer listingHandle={findById(this.props.listingId)} />;
        return (
            <AppHostWrapper title={title} host={this.props.host} className="applet-listing-edit-applet">
                <ListingFormContainer listingHandle={findById(this.props.listingId)} onAfterSave={this._onAfterSave} onCancel={this._onCancel} />
            </AppHostWrapper>
        );
    }
}

export { ListingEditApplet }


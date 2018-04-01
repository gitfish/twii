import * as React from "react";
import { observer } from "mobx-react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { IListingModel } from "../model/IListingModel";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { Sync } from "@twii/common/lib/component/Sync";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { AppFrame } from "@twii/common/lib/component/AppFrame";
import { isExternalListing } from "../ListingHelper";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { ListingModelSupplier } from "../model/ListingModelSupplier";

interface IListingLaunchProps extends IAppProps {
    listing: IListingModel;
}

@observer
class ListingLaunch extends React.Component<IListingLaunchProps, any> {
    componentWillMount() {
        this.props.host.setTitle(this.props.listing.title);
    }
    get external() {
        return isExternalListing(this.props.listing);
    }
    render() {
        const listing = this.props.listing;
        if(!listing.is_enabled) {
            return (
                <MessageBar messageBarType={MessageBarType.blocked}>
                    <strong>{this.props.listing.title}</strong> is currently disabled.
                </MessageBar>
            );
        }

        if(listing.is_deleted) {
            return (
                <MessageBar messageBarType={MessageBarType.blocked}>
                    <strong>{this.props.listing.title}</strong> has been removed and is no longer accessible.
                </MessageBar>
            );
        }
        if(listing.approval_status !== ListingApprovalStatus.APPROVED) {
            return (
                <MessageBar messageBarType={MessageBarType.blocked}>
                    <strong>{this.props.listing.title}</strong> is not currently available for use.
                </MessageBar>
            );
        }
        
        if(this.external) {
            // TODO: we need to check whether this is an external js app and launch it differently if so
            return <AppFrame src={listing.launch_url} host={this.props.host} />;
        }

        return null;
    }

    componentDidMount() {
        if(!this.external) {
            this.props.host.load({ path: this.props.listing.launch_url });
        }
    }

    componentDidUpdate() {
        if(!this.external) {
            this.props.host.load({ path: this.props.listing.launch_url });
        }
    }
}

interface IListingLaunchContainerProps extends IAppProps {
    listingSupplier: ISyncSupplier<IListingModel>;
}

class ListingLaunchContainer extends React.Component<IListingLaunchContainerProps, any> {
    componentWillMount() {
        this.props.listingSupplier.load();
    }
    private _onRenderDone = () => {
        return <ListingLaunch host={this.props.host} listing={this.props.listingSupplier.value} />;
    }
    render() {
        return <Sync sync={this.props.listingSupplier.sync} onRenderDone={this._onRenderDone} syncLabel={`Launching ${this.props.host.params.title || ""}...`} />;
    }
}

interface IListingLaunchAppProps extends IAppProps {
    listingId: number;
}

class ListingLaunchApp extends React.Component<IListingLaunchAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle(`${this.props.host.params.title || ""}`);
    }
    render() {
        return (
            <HostAppView title="Launching" host={this.props.host}>
                <ListingLaunchContainer host={this.props.host} listingSupplier={new ListingModelSupplier(this.props.listingId)} />
            </HostAppView>
        );
    }
}

export { IListingLaunchAppProps, ListingLaunchApp }
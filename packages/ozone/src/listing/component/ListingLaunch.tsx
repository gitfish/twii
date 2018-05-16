import * as React from "react";
import { observer } from "mobx-react";
import { IListingModel } from "../model/IListingModel";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import { ISyncSupplier } from "@twii/core/lib/ISyncSupplier";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { isExternalListing } from "../ListingHelper";
import { AppFrame } from "@twii/core-ui-fabric/lib/component/AppFrame";
import { Sync } from "@twii/core-ui-fabric/lib/component/Sync";
import { IAppProps } from "@twii/core-ui/lib/component/IAppProps";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { ListingModelSupplier } from "../model/ListingModelSupplier";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { IAppHost } from "@twii/core/lib/IAppHost";

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
        
        if(this.external && !this.props.host.root) {
            return <AppFrame src={listing.launch_url} host={this.props.host} />;
        }

        return null;
    }

    componentDidMount() {
        if(!this.external) {
            this.props.host.load({ path: this.props.listing.launch_url });
        } else if(this.props.host.root) {
            // this is a bit dodgy
            window.location.assign(this.props.listing.launch_url);
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

class ListingLaunchApp extends React.Component<IOzoneAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    componentWillMount() {
        this.host.setTitle(`${this.props.match.params.title || ""}`);
    }
    get listingId() {
        return this.props.match.params.listingId;
    }
    render() {
        return (
            <HostAppView host={this.host}>
                <ListingLaunchContainer host={this.host} listingSupplier={new ListingModelSupplier(this.listingId)} />
            </HostAppView>
        );
    }
}

export {
    ListingLaunchApp,
    ListingLaunchApp as default
}
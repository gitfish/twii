import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { IListingModel } from "../IListingModel";
import { IHandleModel } from "common/IHandleModel";
import { ISyncHandle } from "common/ISyncHandle";
import { SyncContainer } from "common/component/SyncContainer";
import { SyncOverlay } from "common/component/SyncOverlay";
import { IListingStyles, getStyles } from "./Listing.styles";
import { IListingClassNames, getClassNames } from "./Listing.classNames";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Rating } from "office-ui-fabric-react/lib/Rating";
import { DefaultButton, PrimaryButton, IButtonProps, IconButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { ListingPreview } from "./ListingPreview";
import { UserProfileHandleStore } from "user/UserProfileHandleStore";
import { isAuthorised } from "user/UserAuthHandler";
import { UserGroup } from "user/UserGroup";
import { Error } from "common/component/Error";
import { onRenderItemError, onRenderItemLoading } from "app/component/AppItemHelper";
import { UserAuthContainer } from "user/component/UserAuthContainer";
import { RootAppHost } from "app/RootAppHost";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { AppContainer } from "app/component/AppContainer";
import { ListingHandleContainer } from "./ListingHandle";
import { ListingReviewListContainer } from "./ListingReviewList";
import { getReviews } from "../ListingReviewHelper";
import { ListingActivityListContainer }  from "./ListingActivityList";
import { getActivity } from "../ListingActivityHelper";
import { ListingBookmarksStore } from "../ListingBookmarksStore";
import { isExternalUrl } from "../ListingHelper";
import { ListingApprovalStatus } from "listing/ListingApprovalStatus";
import { Dialog, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { ListingLinks } from "./ListingLinks";

interface IListingProps {
    listing: IListingModel;
    onEdit?: (listing : IListingModel) => void;
    onDelete?: (listing : IListingModel) => void;
    onBackToShop?: () => void;
    styles?: IListingStyles;
    className?: string;
}

@observer
class ListingRating extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        if(this.props.listing.avg_rate !== undefined && this.props.listing.avg_rate > 0) {
            return <Rating min={1} max={5} rating={this.props.listing.avg_rate} readOnly={true} ariaLabelFormat="Rated {0} out of {1}" />;
        }
        return <Rating title="No Reviews Available" min={1} max={5} rating={5} readOnly={true} disabled={true} ariaLabelFormat="No reviews available" />;
    }
}

@observer
class BookmarkAction extends React.Component<IListingProps, any> {
    private _onClick = () => {
        const bookmark = ListingBookmarksStore.getBookmarkForListingId(this.props.listing.id);
        if(bookmark) {
            ListingBookmarksStore.removeBookmark(bookmark);
        } else {
            ListingBookmarksStore.addBookmark({ listing: { id: this.props.listing.id }});
        }
    }
    componentWillMount() {
        ListingBookmarksStore.load();
    }
    private _onRenderSyncIcon = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const syncing = ListingBookmarksStore.sync.syncing || ListingBookmarksStore.updateSync.syncing;
        let bookmark;
        if(!syncing) {
            bookmark = ListingBookmarksStore.getBookmarkForListingId(this.props.listing.id);
        }
        const title = syncing ? "Please wait..." : bookmark ? "Bookmarked - Click to Remove" : "Click to Set Bookmark";
        const props : IButtonProps = {
            onClick: this._onClick,
            title: title,
            iconProps: { iconName: "SingleBookmark" },
            disabled: syncing,
            ariaDescription: title,
            onRenderIcon: syncing ? this._onRenderSyncIcon : undefined
        };
        return bookmark ? <PrimaryButton {...props} /> : <DefaultButton {...props} />;             
    }
}

class AdminActions extends React.Component<IListingProps, any> {
    private _onClickEdit = () => {
        this.props.onEdit(this.props.listing);
    }
    private _onClickApprove = () => {
        this.props.listing.approve();
    }
    private _onClickReject = () => {
        this.props.listing.reject();
    }
    private _onClickDelete = () => {
       this.props.onDelete(this.props.listing);
    }
    private _onClickSubmit = () => {
        this.props.listing.submitForApproval();
    }
    private _onRenderAuth = () => {
        const approvalStatus = this.props.listing.approval_status;
        const menuItems : IContextualMenuItem[] = [];
        if(this.props.onEdit) {
            menuItems.push({
                key: "edit",
                name: "Edit",
                iconProps: { iconName: "Edit" },
                onClick: this._onClickEdit
            });
            if(this.props.onDelete && approvalStatus !== ListingApprovalStatus.DELETED && approvalStatus !== ListingApprovalStatus.PENDING_DELETION) {
                menuItems.push({
                    key: "delete",
                    name: "Delete",
                    iconProps: { iconName: "Delete" },
                    onClick: this._onClickDelete
                })
            }
        }
        if(approvalStatus === ListingApprovalStatus.PENDING || approvalStatus === ListingApprovalStatus.IN_PROGRESS) {
            menuItems.push({
                key: "sep",
                name: "-"
            });
            if(approvalStatus === ListingApprovalStatus.IN_PROGRESS) {
                menuItems.push({
                    key: "submit",
                    name: "Submit for Approval",
                    iconProps: { iconName: "WorkFlow" },
                    onClick: this._onClickSubmit
                });
            } else {
                menuItems.push({
                    key: "approve",
                    name: "Approve",
                    iconProps: { iconName: "Accept" },
                    onClick: this._onClickApprove
                });
                menuItems.push({
                    key: "reject",
                    name: "Reject",
                    iconProps: { iconName: "Cancel" },
                    onClick: this._onClickReject
                });
            }
        }
        if(menuItems.length > 0) {
            return <PrimaryButton title="Admin Actions" menuProps={{ items: menuItems }} iconProps={{ iconName: "Settings" }}></PrimaryButton>
        }
        return null;
    }
    render() {
        return <UserAuthContainer requiredAuthGroup={UserGroup.ADMIN} onRenderUser={this._onRenderAuth} />
    }
}

@observer
class OpenAction extends React.Component<IListingProps, any> {
    private _onClick = () => {
        let launchUrl = this.props.listing.launch_url;
        if(!isExternalUrl(launchUrl)) {
            launchUrl = RootAppHost.getUrl({ path: this.props.listing.launch_url });
        }
        window.open(launchUrl);
    }
    render() {
        if(this.props.listing.launch_url) {
            return <PrimaryButton onClick={this._onClick} title="Open in New Window" iconProps={{ iconName: "OpenInNewWindow" }}>Open</PrimaryButton>
        }
        return null;
    }
}

class OwnerEditAction extends React.Component<IListingProps, any> {
    private _onClick = () => {
        this.props.onEdit(this.props.listing);
    }
    private _onRenderAuth = () => {
        return <PrimaryButton onClick={this._onClick} title="Edit Listing" iconProps={{ iconName: "Edit" }}>Edit</PrimaryButton>
    }
    private _isAuthorised = (userProfile) => {
        const owners = this.props.listing.owners;
        if(owners) {
            return owners.some(p => p.id === userProfile.id);
        }
        return false;
    }
    render() {
        if(this.props.onEdit) {
            return <UserAuthContainer isAuthorised={this._isAuthorised} onRenderUser={this._onRenderAuth} />
        }
        return null;
    }
}

class ListingActions extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles));
        return (
            <div className={classNames.actions}>
                <BookmarkAction {...this.props} />
                <OpenAction {...this.props} />
                <OwnerEditAction {...this.props} />
                <AdminActions {...this.props} />
            </div>
        );
    }
}

@observer
class ListingCommandBar extends React.Component<IListingProps, any> {
    render() {
        const items : IContextualMenuItem[] = [];
        if(this.props.onBackToShop) {
            items.push(
                {
                    key: "backToShop",
                    name: "Shop",
                    iconProps: { iconName: "Shop" },
                    onClick: this.props.onBackToShop
                }
            );
        }
        if(items.length > 0) {
            return <CommandBar items={items} />;
        }
        return null;
    }
}

class ListingReviews extends React.Component<IListingProps, any> {
    render() {
        return <ListingReviewListContainer reviewList={getReviews(this.props.listing)} />
    }
}

class ListingActivity extends React.Component<IListingProps, any> {
    render() {
        return <ListingActivityListContainer activityList={getActivity(this.props.listing)} />
    }
}

@observer
class Listing extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <SyncOverlay sync={this.props.listing.saveSync} syncLabel="Please wait..." />
                <div className={classNames.header}>
                    <ListingPreview listing={this.props.listing} />
                    <div className={classNames.headerContent}>
                        <div className={classNames.summary}>
                            <div className={classNames.title}>
                                {this.props.listing.title}
                            </div>
                            <div className={classNames.shortDescription}>{this.props.listing.description_short}</div>
                            <div>Version {this.props.listing.version_name}</div>
                            <ListingRating {...this.props} />
                        </div>
                        <ListingActions {...this.props} />
                    </div>
                </div>
                <div className={classNames.body}>
                    <Pivot>
                        <PivotItem linkText="Description">
                            <div className={classNames.description}>
                                {this.props.listing.description}
                            </div>
                        </PivotItem>
                        <PivotItem linkText="Reviews">
                            <ListingReviews {...this.props} />
                        </PivotItem>
                        <PivotItem linkText="Activity">
                            <ListingActivity {...this.props} />
                        </PivotItem>
                        <PivotItem linkText="Links">
                            <ListingLinks {...this.props} />
                        </PivotItem>
                    </Pivot>
                </div>
            </div>
        );
    }
}

interface IListingContainerProps {
    listingHandle: ISyncHandle<IListingModel>;
    onEdit?: (listing : IListingModel) => void;
    onDelete?: (listing : IListingModel) => void;
    onBackToShop?: () => void;
}

class ListingTitleContainer extends React.Component<IListingContainerProps, any> {
    private _onRenderDone = () => {
        return `${this.props.listingHandle.value ? this.props.listingHandle.value.title : ""}`;
    }
    private _onRenderSync = () => {
        return `Loading...`;
    }
    render() {
        return <SyncContainer sync={this.props.listingHandle.sync} onRenderSync={this._onRenderSync} onRenderDone={this._onRenderDone} />
    }
}

class ListingContainer extends React.Component<IListingContainerProps, any> {
    private _onRenderListing = (listing : IListingModel) => {
        return [
            <ListingCommandBar key="listing-command-bar" listing={listing} onEdit={this.props.onEdit} onBackToShop={this.props.onBackToShop} />,
            <Listing key="listing-details" listing={listing} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
        ];
    }
    render() {
        return <ListingHandleContainer listingHandle={this.props.listingHandle} onRenderListing={this._onRenderListing} />
    }
}

interface IListingDeleteProps {
    listingHandle: IHandleModel<IListingModel>;
}

@observer
class ListingDeleteDialog extends React.Component<IListingDeleteProps, any> {
    private _onDismiss = () => {
        this.props.listingHandle.clearValue();
    }
    private _onClickCancel = () => {
        this.props.listingHandle.clearValue();
    }
    private _onClickConfirm = () => {
        this.props.listingHandle.value.delete();
        this.props.listingHandle.clearValue();
    }
    render() {
        const listing = this.props.listingHandle.value;
        const content = listing ? <div>Are you sure you want to delete <strong>{listing.title}</strong></div> : undefined;
        return (
            <Dialog hidden={listing ? false : true}
                    title="Delete Listing"
                    onDismiss={this._onDismiss}>
                {content}
                <DialogFooter>
                    <DefaultButton onClick={this._onClickCancel}>Cancel</DefaultButton>
                    <PrimaryButton onClick={this._onClickConfirm}>OK</PrimaryButton>
                </DialogFooter>
            </Dialog>
        );
    }
}

export {
    IListingProps,
    IListingContainerProps,
    Listing,
    ListingContainer,
    ListingTitleContainer,
    ListingDeleteDialog
}


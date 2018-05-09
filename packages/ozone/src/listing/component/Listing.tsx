import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { IListingModel } from "../model/IListingModel";
import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { Sync } from "@twii/fabric-ui/lib/component/Sync";
import { SyncOverlay } from "@twii/fabric-ui/lib/component/SyncOverlay";
import { IListingStyles, getStyles } from "./Listing.styles";
import { IListingClassNames, getClassNames } from "./Listing.classNames";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Rating } from "office-ui-fabric-react/lib/Rating";
import { DefaultButton, PrimaryButton, IButtonProps, IconButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { ListingPreview } from "./ListingPreview";
import { UserAuthContainer, UserAdminContainer } from "../../user/component/UserAuthContainer";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { ListingSupplierContainer } from "./ListingSupplier";
import { ListingReviewListContainer } from "./ListingReviewList";
import { getReviews } from "../model/ListingReviewHelper";
import { ListingActivityListContainer } from "./ListingActivityList";
import { getActivity } from "../model/ListingActivityHelper";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { isExternalUrl } from "../ListingHelper";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import { Dialog, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { ListingLinks } from "./ListingLinks";
import { IListingBookmarkListModel } from "../model/IListingBookmarkListModel";

interface IListingProps {
    listing: IListingModel;
    adminGroup?: string;
    bookmarkList?: IListingBookmarkListModel;
    onEdit?: (listing : IListingModel) => void;
    onOpen?: (listing : IListingModel) => void;
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

interface IListingBookmarkActionProps {
    listing: IListingModel;
    bookmarkList?: IListingBookmarkListModel;
}

@observer
class ListingBookmarkAction extends React.Component<IListingBookmarkActionProps, any> {
    private _onClick = () => {
        const bookmark = this.props.bookmarkList.getBookmarkForListingId(this.props.listing.id);
        if(bookmark) {
            this.props.bookmarkList.removeBookmark(bookmark);
        } else {
            this.props.bookmarkList.addBookmark({ listing: { id: this.props.listing.id }});
        }
    }
    componentWillMount() {
        this.props.bookmarkList.load();
    }
    private _onRenderSyncIcon = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        if(this.props.bookmarkList) {
            const syncing = this.props.bookmarkList.sync.syncing;
            let bookmark;
            if(!syncing) {
                bookmark = this.props.bookmarkList.getBookmarkForListingId(this.props.listing.id);
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
        return null;   
    }
}

interface IListingAdminActionsProps {
    listing: IListingModel;
    onEdit?: (listing : IListingModel) => void;
    onDelete?: (listing : IListingModel) => void;
}

class ListingAdminActions extends React.Component<IListingAdminActionsProps, any> {
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
        return (
            <UserAdminContainer onRenderUser={this._onRenderAuth} />
        );
    }
}

interface IListingOpenActionProps {
    listing: IListingModel;
    onOpen?: (listing : IListingModel) => void;
}

@observer
class ListingOpenAction extends React.Component<IListingOpenActionProps, any> {
    private _onClick = () => {
        this.props.onOpen(this.props.listing);
    }
    render() {
        if(this.props.onOpen) {
            return <PrimaryButton onClick={this._onClick} title="Open in New Window" iconProps={{ iconName: "OpenInNewWindow" }}>Open</PrimaryButton>
        }
        return null;
    }
}

interface ListingOwnerEditActionProps {
    listing: IListingModel;
    onEdit?: (listing : IListingModel) => void;
}

class ListingOwnerEditAction extends React.Component<ListingOwnerEditActionProps, any> {
    private _onClick = () => {
        this.props.onEdit(this.props.listing);
    }
    private _onRenderAuth = () => {
        return <PrimaryButton onClick={this._onClick} title="Edit Listing" iconProps={{ iconName: "Edit" }}>Edit</PrimaryButton>
    }
    private _isAuthorised = (userProfile) => {
        // TODO: take account of the listing status here
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
                <ListingBookmarkAction listing={this.props.listing} bookmarkList={ListingBookmarkListStore} />
                <ListingOpenAction listing={this.props.listing} onOpen={this.props.onOpen} />
                <ListingOwnerEditAction listing={this.props.listing} onEdit={this.props.onEdit} />
                <ListingAdminActions listing={this.props.listing} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
            </div>
        );
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
    listingSupplier: ISyncSupplier<IListingModel>;
    onEdit?: (listing : IListingModel) => void;
    onDelete?: (listing : IListingModel) => void;
    onOpen?: (listing : IListingModel) => void;
    onBackToShop?: () => void;
}

class ListingTitleContainer extends React.Component<IListingContainerProps, any> {
    private _onRenderDone = () => {
        return `${this.props.listingSupplier.value ? this.props.listingSupplier.value.title : ""}`;
    }
    private _onRenderSync = () => {
        return `Loading...`;
    }
    render() {
        return <Sync sync={this.props.listingSupplier.sync} onRenderSync={this._onRenderSync} onRenderDone={this._onRenderDone} />
    }
}

class ListingContainer extends React.Component<IListingContainerProps, any> {
    private _onRenderListing = (listing : IListingModel) => {
        return <Listing key="listing-details" listing={listing} onEdit={this.props.onEdit} onDelete={this.props.onDelete} onOpen={this.props.onOpen} />;
    }
    render() {
        return <ListingSupplierContainer listingSupplier={this.props.listingSupplier} onRenderListing={this._onRenderListing} />;
    }
}

interface IListingDeleteProps {
    listingSupplier: ISyncSupplier<IListingModel>;
}

@observer
class ListingDeleteDialog extends React.Component<IListingDeleteProps, any> {
    private _onDismiss = () => {
        this.props.listingSupplier.clearValue();
    }
    private _onClickCancel = () => {
        this.props.listingSupplier.clearValue();
    }
    private _onClickConfirm = () => {
        this.props.listingSupplier.value.delete();
        this.props.listingSupplier.clearValue();
    }
    render() {
        const listing = this.props.listingSupplier.value;
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
    IListingDeleteProps,
    ListingDeleteDialog
}


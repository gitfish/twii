import * as React from "react";
import { observer } from "mobx-react";
import { IListingModel } from "../model/IListingModel";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Checkbox, ICheckboxStyles } from "office-ui-fabric-react/lib/Checkbox";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IListingFormStyles, getStyles } from "./ListingForm.styles";
import { IListingFormClassNames, getClassNames } from "./ListingForm.classNames";
import { ISyncSupplier } from "@twii/core/lib/ISyncSupplier";
import { Sync } from "@twii/core-ui-fabric/lib/component/Sync";
import { IImage } from "../../media/IImage";
import { ImageField } from "../../media/component/ImageField";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import { Details } from "@twii/core-ui-fabric/lib/component/Details";
import { IDetailsStyles } from "@twii/core-ui-fabric/lib/component/Details.styles";
import { ValidationErrors } from "@twii/core-ui-fabric/lib/component/ValidationErrors";
import { getPropErrorMessage } from "@twii/core/lib/ErrorUtils";
import { ListingLinkForm } from "./ListingLinkForm";
import { getTheme } from "@uifabric/styling";

interface IListingEditorProps {
    listing: IListingModel;
    onCancel?: () => void;
    onSave?: (listing : IListingModel) => void;
    onSubmitForApproval?: (listing : IListingModel) => void;
    styles?: IListingFormStyles;
}

interface IListingFormSectionProps {
    title: string;
}

class ListingFormSection extends React.Component<IListingFormSectionProps, any> {
    render() {
        const theme = getTheme();
        const styles : IDetailsStyles = {
            root: {
                marginTop: 8,
                marginBottom: 8,
                border: `1px solid ${theme.palette.themeDark}`
            },
            header: { 
                backgroundColor: theme.palette.themeDark,
                selectors: { 
                    "&:hover": { 
                        backgroundColor: theme.palette.themeDark
                    }
                }
            },
            body: {
                padding: 8
            }
        };
        return (
            <Details title={this.props.title}
                        styles={styles}
                        open={true}
                        disableControl>
                {this.props.children}
            </Details>
        );
    }
}

class ListingEditorDocumentSection extends React.Component<IListingEditorProps, any> {
    render() {
        return (
            <ListingFormSection title="Links">
                <ListingLinkForm listing={this.props.listing} />
            </ListingFormSection>
        );
    }
}

@observer
class ListingEditorImagesSection extends React.Component<IListingEditorProps, any> {
    private _onSmallIconChanged = (smallIcon : IImage) => {
        this.props.listing.setSmallIcon(smallIcon);
    }
    private _onLargeIconChanged = (largeIcon : IImage) => {
        this.props.listing.setLargeIcon(largeIcon);
    }
    private _onBannerIconChanged = (bannerIcon : IImage) => {
        this.props.listing.setBannerIcon(bannerIcon);
    }
    private _onLargeBannerIconChanged = (largeBannerIcon : IImage) => {
        this.props.listing.setLargeBannerIcon(largeBannerIcon);
    }
    render() {
        return (
            <ListingFormSection title="Images">
                <ImageField onChange={this._onSmallIconChanged} image={this.props.listing.small_icon} defaultSelectText="Select Small Icon..." label="Small Icon" width={16} height={16}  />
                <ImageField onChange={this._onLargeIconChanged} image={this.props.listing.large_icon} defaultSelectText="Select Large Icon..." label="Large Icon" width={32} height={32} />
                <ImageField onChange={this._onBannerIconChanged} image={this.props.listing.banner_icon} defaultSelectText="Select Banner Icon..." label="Banner Icon" width={220} height={137} />
                <ImageField onChange={this._onLargeBannerIconChanged} image={this.props.listing.large_banner_icon} defaultSelectText="Select Large Banner Icon..." label="Large Banner Icon" width={1200} height={900} />
            </ListingFormSection>
        )
    }
}

@observer
class ListingEditor extends React.Component<IListingEditorProps, any> {
    private _onTitleChanged = (value : string) => {
        this.props.listing.setTitle(value);
    }
    private _onDescriptionChanged = (value : string) => {
        this.props.listing.setDescription(value);
    }
    private _onShortDescriptionChanged = (value : string) => {
        this.props.listing.setShortDescription(value);
    }
    private _onEnabledChanged = (e : React.MouseEvent<HTMLElement>, value : boolean) => {
        this.props.listing.setEnabled(value);
    }
    private _onFeaturedChanged = (e : React.MouseEvent<HTMLElement>, value : boolean) => {
        this.props.listing.setFeatured(value);
    }
    private _onPrivateChanged = (e : React.MouseEvent<HTMLElement>, value : boolean) => {
        this.props.listing.setPrivate(value);
    }
    private _onLaunchUrlChanged = (value : string) => {
        this.props.listing.setLaunchUrl(value);
    }
    private _onVersionChanged = (value : string) => {
        this.props.listing.setVersion(value);
    }
    private _onSecurityMarkingChanged = (value : string) => {
        this.props.listing.setSecurityMarking(value);
    }
    render() {
        const styles = getStyles(undefined, this.props.styles);
        const inputDisabled = this.props.listing.saveSync.syncing;
        const cbStyles : ICheckboxStyles = {
            root: {
                marginTop: 8
            }
        };
        const validationErrors = this.props.listing.validationErrors;
        const approvalStatus = this.props.listing.approval_status;
        return (
            <div className={getClassNames(styles).editor}>
                <TextField onChanged={this._onTitleChanged}
                            value={this.props.listing.title || ""}
                            label="Title"
                            disabled={inputDisabled}
                            required
                            errorMessage={getPropErrorMessage("title", validationErrors)} />
                <TextField onChanged={this._onShortDescriptionChanged} 
                            value={this.props.listing.description_short || ""}
                            label="Short Description"
                            disabled={inputDisabled}
                            required={approvalStatus !== ListingApprovalStatus.IN_PROGRESS}
                            errorMessage={getPropErrorMessage("description_short", validationErrors)}/>
                <TextField onChanged={this._onDescriptionChanged}
                            value={this.props.listing.description || ""}
                            label="Description"
                            disabled={inputDisabled}
                            multiline={true}
                            rows={6}
                            resizable={false}
                            required={approvalStatus !== ListingApprovalStatus.IN_PROGRESS}
                            errorMessage={getPropErrorMessage("description", validationErrors)} />
                <TextField onChanged={this._onLaunchUrlChanged}
                            value={this.props.listing.launch_url || ""}
                            label="Launch URL"
                            disabled={inputDisabled}
                            required={this.props.listing.id ? true : false}
                            errorMessage={getPropErrorMessage("launch_url", validationErrors)} />
                <TextField onChanged={this._onVersionChanged} value={this.props.listing.version_name || ""} label="Version" disabled={inputDisabled} />
                <TextField onChanged={this._onSecurityMarkingChanged}
                            value={this.props.listing.security_marking || ""}
                            label="Security"
                            disabled={inputDisabled}
                            required
                            errorMessage={getPropErrorMessage("security_marking", validationErrors)} />
                <ListingEditorImagesSection {...this.props} />
                <ListingEditorDocumentSection {...this.props} />
                <Checkbox onChange={this._onFeaturedChanged} checked={this.props.listing.is_featured ? true : false} label="Featured" disabled={inputDisabled} styles={cbStyles} />
                <Checkbox onChange={this._onEnabledChanged} checked={this.props.listing.is_enabled ? true : false} label="Enabled" disabled={inputDisabled} styles={cbStyles} />
                <Checkbox onChange={this._onPrivateChanged} checked={this.props.listing.is_private ? true : false} label="Private" disabled={inputDisabled} styles={cbStyles} />
            </div>
        );
    }
}

@observer
class ListingSaveAction extends React.Component<IListingEditorProps, any> {
    private _onClick = () => {
        this.props.onSave(this.props.listing);
    }
    private _onRenderSyncIcon = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const syncing = this.props.listing.saveSync.syncing;
        const syncSave = this.props.listing.saveSync.type === "save";
        return (
            <PrimaryButton className="action save-action" onClick={this._onClick} iconProps={syncing && syncSave ? undefined : { iconName: "Save" }} onRenderIcon={syncing && syncSave ? this._onRenderSyncIcon : undefined} disabled={syncing}>
                {syncing && syncSave ? "Saving..." : "Save"}
            </PrimaryButton>
        );
    }
}

@observer
class ListingSubmitAction extends React.Component<IListingEditorProps, any> {
    private _onClick = () => {
        /*
        this.props.listing.submitForApproval().then(() => {
            if(!this.props.listing.saveSync.error && this.props.onAfterSave) {
                this.props.onAfterSave(this.props.listing);
            }
        });
        */
        this.props.onSubmitForApproval(this.props.listing);
    }
    private _onRenderSyncIcon = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const syncing = this.props.listing.saveSync.syncing;
        const approvalStatus = this.props.listing.approval_status;
        if(approvalStatus === ListingApprovalStatus.IN_PROGRESS || approvalStatus === ListingApprovalStatus.REJECTED) {
            const syncSubmit = this.props.listing.saveSync.type === "submit";
            return (
                <PrimaryButton className="action submit-action"
                               onClick={this._onClick}
                               iconProps={syncing && syncSubmit ? undefined : { iconName: "WorkFlow" }} onRenderIcon={syncing && syncSubmit ? this._onRenderSyncIcon : undefined}
                               disabled={syncing}
                               title="Submit for Approval">
                    {syncing && syncSubmit ? "Submitting for Approval..." : "Submit for Approval"}
                </PrimaryButton>
            );
        }
        return null;
    }
}

@observer
class ListingCancelAction extends React.Component<IListingEditorProps, any> {
    private _onClick = () => {
        this.props.listing.reset();
        if(this.props.onCancel) {
            this.props.onCancel();
        }
    }
    render() {
        return <DefaultButton className="action cancel-action" onClick={this._onClick} disabled={this.props.listing.saveSync.syncing}>Cancel</DefaultButton>;
    }
}

class ListingActions extends React.Component<IListingEditorProps, any> {
    render() {
        const styles = getStyles(undefined, this.props.styles);
        return (
            <div className={getClassNames(styles).actions}>
                {this.props.onCancel ? <ListingCancelAction {...this.props} /> : undefined}
                {this.props.onSave ? <ListingSaveAction {...this.props} /> : undefined}
                {this.props.onSubmitForApproval ? <ListingSubmitAction {...this.props} /> : undefined}
            </div>
        );
    }
}

@observer
class ListingSaveSync extends React.Component<IListingEditorProps, any> {
    render() {
        if(this.props.listing.saveSync.error) {
            return (
                <MessageBar messageBarType={MessageBarType.error}>
                    Unable to save listing - {this.props.listing.saveSync.error.message}
                </MessageBar>
            );
        }
        return null;
    }
}

@observer
class ListingValidationErrors extends React.Component<IListingEditorProps, any> {
    render() {
        return <ValidationErrors errors={this.props.listing.validationErrors} />;
    }
}

class ListingForm extends React.Component<IListingEditorProps, any> {
    render() {
        const styles = getStyles(undefined, this.props.styles);
        return (
            <div className={getClassNames(styles).root}>
                <ListingValidationErrors {...this.props} />
                <ListingSaveSync {...this.props} />
                <ListingEditor {...this.props} />
                <ListingActions {...this.props} />
            </div>
        );
    }
}

interface IListingFormContainerProps {
    listingSupplier: ISyncSupplier<IListingModel>;
    onSave?: (listing : IListingModel) => void;
    onSubmitForApproval?: (listing : IListingModel) => void;
    onCancel?: () => void;
}

class ListingFormContainer extends React.Component<IListingFormContainerProps, any> {
    private _onRenderDone = () => {
        return <ListingForm listing={this.props.listingSupplier.value}
                            onCancel={this.props.onCancel}
                            onSave={this.props.onSave}
                            onSubmitForApproval={this.props.onSubmitForApproval} />;
    }
    render() {
        return <Sync sync={this.props.listingSupplier.sync} onRenderDone={this._onRenderDone} />
    }
}

export {
    IListingFormContainerProps,
    IListingEditorProps,
    ListingEditor,
    ListingForm,
    ListingFormContainer
}
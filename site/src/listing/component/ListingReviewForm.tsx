import * as React from "react";
import { observer } from "mobx-react";
import { IListingReviewModel } from "../IListingReviewModel";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Rating } from "office-ui-fabric-react/lib/Rating";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { IListingReviewFormStyles, getStyles } from "./ListingReviewForm.styles";
import { IListingReviewFormClassNames, getClassNames } from "./ListingReviewForm.classNames";

interface IListingReviewFormProps {
    review: IListingReviewModel;
    className?: string;
    styles?: IListingReviewFormStyles;
    onAfterSave?: (review : IListingReviewModel) => void;
    onCancel?: () => void;
}

@observer
class ListingReviewEditor extends React.Component<IListingReviewFormProps, any> {
    private _onRatingChanged = (rating : number) => {
        this.props.review.setRate(rating);
    }
    private _onCommentsChanged = (text : string) => {
        this.props.review.setText(text);
    }
    render() {
        return (
            <div className={this.props.className}>
                <div className="rating">
                    <Rating min={1} max={5} onChanged={this._onRatingChanged} rating={this.props.review.rate || null} disabled={this.props.review.saveSync.syncing} />
                </div>
                <div className="review">
                    <TextField placeholder="Tell us what you think" multiline={true} resizable={false} onChanged={this._onCommentsChanged} disabled={this.props.review.saveSync.syncing} />
                </div>
            </div>
        )
    }
}

@observer
class ListingReviewActions extends React.Component<IListingReviewFormProps, any> {
    private _onClickCancel = () => {
        if(this.props.onCancel) {
            this.props.onCancel();
        }
    }
    private _onClickSave = () => {
        this.props.review.save().then(() => {
            if(!this.props.review.saveSync.error && this.props.onAfterSave) {
                this.props.onAfterSave(this.props.review);
            }
        });
    }
    render() {
        const savedDisabled = this.props.review.saveSync.syncing || this.props.review.rate === null || this.props.review.rate === undefined;
        return (
            <div className={this.props.className}>
                <DefaultButton className="listing-review-action" onClick={this._onClickCancel} disabled={this.props.review.saveSync.syncing}>Cancel</DefaultButton>
                <PrimaryButton className="listing-review-action" iconProps={{ iconName: "Save" }} onClick={this._onClickSave} disabled={savedDisabled}>Save</PrimaryButton>
            </div>
        )
    }
}

class ListingReviewForm extends React.Component<IListingReviewFormProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <ListingReviewEditor {...this.props} className={classNames.editor} />
                <ListingReviewActions {...this.props} className={classNames.actions} />
            </div>
        );
    }
}

export { IListingReviewFormProps, ListingReviewEditor, ListingReviewForm }
import * as React from "react";
import { IListingReview } from "../IListingReview";
import { getClassNames, IListingReviewClassNames } from "./ListingReview.classNames";
import { getStyles, IListingReviewStyles } from "./ListingReview.styles";
import { Rating } from "office-ui-fabric-react/lib/Rating";
import * as DateUtils from "util/Date";

interface IListingReviewProps {
    review: IListingReview;
    className?: string;
    styles?: IListingReviewStyles;
}

class ListingReview extends React.Component<IListingReviewProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        const review = this.props.review;
        const author = review.author;
        return (
            <div className={classNames.root}>
                <div className={classNames.header}>
                    <div className={classNames.author}>{author.display_name}</div>
                    <div className={classNames.date}>{DateUtils.dataTimestampToOutputText(review.edited_date || review.created_date)}</div>
                    <Rating className={classNames.rating} rating={review.rate} readOnly={true} />
                </div>
                <div className={classNames.body}>
                    <div className={classNames.content}>
                        {review.text}
                    </div>
                </div>
            </div>
        );
    }
} 

export { IListingReviewProps, ListingReview }
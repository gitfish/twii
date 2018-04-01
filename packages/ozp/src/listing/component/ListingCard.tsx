import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { getStyles } from "./ListingCard.styles";
import { getClassNames } from "./ListingCard.classNames";
import { IListingCardStyles } from "./ListingCard.styles";
import { ListingPreview } from "./ListingPreview";

interface IListingCardProps {
    listing: IListing;
    onClick?: (listing : IListing) => void;
    className?: string;
    styles?: IListingCardStyles;
    isBookmark?: boolean;
}

class ListingCardStoreLink extends React.Component<IListingCardProps, any> {
    render() {
        if(this.props.isBookmark) {

        }
        return null;
    }
}

class ListingCard extends React.Component<IListingCardProps, any> {
    private _onClick = () => {
        this.props.onClick(this.props.listing);
    }
    render() {
        const styles = getStyles(undefined, this.props.styles);
        const classNames = getClassNames(styles, this.props.className, this.props.onClick ? true : false);
        return (
            <div className={classNames.root}
                 role={this.props.onClick ? "button" : undefined}
                 onClick={this.props.onClick ? this._onClick : undefined}
                 title={this.props.listing.description_short}>
                <ListingPreview listing={this.props.listing} />
                <div className={classNames.details}>
                    <div className={classNames.title}>{this.props.listing.title}</div>
                    <div className={classNames.shortDescription}>{this.props.listing.description_short}</div>
                    <ListingCardStoreLink {...this.props} />
                </div>
            </div>
        );
    }
}

export { IListingCardProps, ListingCard }
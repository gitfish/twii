import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { IListingPreviewStyles, getStyles } from "./ListingPreview.styles";
import { IListingPreviewClassNames, getClassNames } from "./ListingPreview.classNames";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { css } from "office-ui-fabric-react/lib/Utilities";

interface IListingPreviewProps {
    listing: IListing;
    styles?: IListingPreviewStyles;
    className?: string;
}

@observer
class ListingPreview extends React.Component<IListingPreviewProps, any> {
    private _classNames : IListingPreviewClassNames;
    private _renderFallback() {
        return <div className={this._classNames.fallback}><Icon className={this._classNames.fallbackIcon} iconName="Puzzle" /></div>;
    }
    render() {
        this._classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        let fallback;
        let image;
        if(this.props.listing.banner_icon && this.props.listing.banner_icon.url) {
            image = <Image src={this.props.listing.banner_icon.url} alt={this.props.listing.title} width={220} height={137} />
        } else {
            image = this._renderFallback();
        }
        return (
            <div className={this._classNames.root}>
                {image}
            </div>
        );
    }
}

export { IListingPreviewProps, ListingPreview }
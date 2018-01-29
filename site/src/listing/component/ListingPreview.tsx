import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { IListingPreviewStyles, getStyles } from "./ListingPreview.styles";
import { getClassNames } from "./ListingPreview.classNames";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { ImageRouter } from "media/ImageRouter";
import { isExternalListing } from "../ListingHelper";
import { css } from "office-ui-fabric-react/lib/Utilities";

interface IListingPreviewProps {
    listing: IListing;
    styles?: IListingPreviewStyles;
    className?: string;
}

interface IFallbackPreviewImageState {
    loading: boolean;
    result?: any;
    error?: any;
    className?: string;
}

class FallbackPreviewImage extends React.Component<IListingPreviewProps, any> {
    constructor(props : IListingPreviewProps) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentWillMount() {
        this.setState({ loading: true, result: null, error: null });
        // if the listing is internal and has a banner, use that
        if(!isExternalListing(this.props.listing)) {
            ImageRouter.handleRequest({ path: `${this.props.listing.launch_url}/banner`, params: { width: 220, height: 137 } }).then(value => {
                this.setState({ result: value, loading: false});
            }).catch(error => {
                // does nothing - will just show an icon
                this.setState({ loading: false });
            });
        }
        this.setState({ loading: false });
    }
    render() {
        let content;
        let className;
        if(this.state.loading) {
            content = <Spinner label="Loading..." />
        } else if(this.state.result) {
            content = this.state.result;
        } else {
            className = "listing-preview-fallback-icon";
            content = <Icon iconName="Puzzle" />;
        }
        return <div className={css(this.props.className, className)}>{content}</div>;
    }
}

@observer
class ListingPreview extends React.Component<IListingPreviewProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        let fallback;
        let image;
        if(this.props.listing.banner_icon && this.props.listing.banner_icon.url) {
            image = <Image src={this.props.listing.banner_icon.url} alt={this.props.listing.title} width={220} height={137} />
        } else {
            fallback = <FallbackPreviewImage className={classNames.fallback} {...this.props} />;
        }
        return (
            <div className={classNames.root}>
                {image}
                {fallback} 
            </div>
        );
    }
}

export { IListingPreviewProps, ListingPreview }
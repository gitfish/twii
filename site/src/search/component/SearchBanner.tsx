import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import logoUrl from "./SearchBanner.png";

interface ISearchBannerProps {
    width?: number;
    height?: number;
}

class SearchBanner extends React.Component<ISearchBannerProps, any> {
    render() {
        return <Image src={logoUrl} alt="Super Search" width={this.props.width} height={this.props.height} style={{ margin: 0, border: "none" }}/>
    }
}

export { SearchBanner as default, SearchBanner }
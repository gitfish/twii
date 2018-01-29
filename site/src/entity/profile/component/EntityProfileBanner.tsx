import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import logoUrl from "./EntityProfileBanner.png";

interface IEntityProfileBannerProps {
    width?: number;
    height?: number;
}

class EntityProfileBanner extends React.Component<IEntityProfileBannerProps, any> {
    render() {
        return <Image src={logoUrl} alt="Clipboard" width={this.props.width} height={this.props.height} style={{ margin: 0, border: "none" }}/>
    }
}

export { EntityProfileBanner as default, EntityProfileBanner }
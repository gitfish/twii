import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import logoUrl from "./EntitySearchLogo.png";

interface IEntitySearchLogoProps {
    width?: number;
    height?: number;
}

class EntitySearchLogo extends React.Component<IEntitySearchLogoProps, any> {
    render() {
        return <Image src={logoUrl} alt="Entity Search" width={this.props.width} height={this.props.height} style={{ margin: 0, border: "none" }}/>
    }
}

export { EntitySearchLogo as default, EntitySearchLogo }
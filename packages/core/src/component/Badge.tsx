import * as React from "react";
import { getClassNames } from "./Badge.classNames";
import { getStyles, IBadgeStyles } from "./Badge.styles";
import { css } from "@uifabric/utilities";

interface IBadgeProps {
    title?: string;
    styles?: IBadgeStyles;
    className?: string;
}

class Badge extends React.Component<IBadgeProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return <div className={classNames.root} title={this.props.title}>{this.props.children}</div>
    }
}

export { Badge, IBadgeProps }
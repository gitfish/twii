import * as React from "react";
import { observer } from "mobx-react";
import "./CruiseBookingSummaryItemAttribute.scss";

interface ICruiseBookingSummaryItemAttribute {
    label?: string;
    value?: string;
}


@observer
class CruiseBookingSummaryItemAttribute extends React.Component<ICruiseBookingSummaryItemAttribute, any> {
    render() {
        return (
            <div className="wrapper">
                <div className="attr-label">{this.props.label}</div>
                <div className="attr-value">{this.props.value}</div>
            </div>
        )
    }
}

export { CruiseBookingSummaryItemAttribute as default, CruiseBookingSummaryItemAttribute }


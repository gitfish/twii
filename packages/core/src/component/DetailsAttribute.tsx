import * as React from "react";
import "./DetailsItem.scss";

interface DetailsAttributeProps {
    label: string;
    value: string;
    onRender?: (item?: any) => JSX.Element | JSX.Element[]
}

class DetailsAttribute extends React.Component<DetailsAttributeProps, any> {
    render() {
        return (
            <div className="ms-Grid ms-Grid-col ms-sm12 ms-md6">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6">
                        <span className="details-attribute-label">{this.props.label}</span>
                    </div>
                    <div className="ms-Grid-col ms-sm6">
                        {
                            this.props.onRender ?
                                this.props.onRender() :
                                <span>{this.props.value}</span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export { DetailsAttribute as default, DetailsAttribute, DetailsAttributeProps };
import * as React from "react";
import "./MEDetailsItem.scss";
import { observer } from "mobx-react";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import ViewPreferencesModel from "common/ViewPreferencesModel";

interface MEDetailsAttributeProps {
    label: string;
    value: string | JSX.Element;
}

class MEDetailsAttribute extends React.Component<MEDetailsAttributeProps, any> {
    render() {
        return (
            <div className="ms-Grid ms-Grid-col ms-sm12 ms-md12 info-wrapper">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 details-attribute-label">
                        <span className="details-attribute-label">{this.props.label}</span>
                    </div>
                    <div className="ms-Grid-col ms-sm6">
                        <span>{this.props.value}</span>
                    </div>
                </div>
            </div>
        )
    }
}

class MEPNRSummaryDetailsAttribute extends React.Component<MEDetailsAttributeProps, any> {
    render() {
        return (
            <div className="ms-Grid ms-Grid-col ms-sm12 ms-md6">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6">
                        <span className="details-attribute-label">{this.props.label}</span>
                    </div>
                    <div className="ms-Grid-col ms-sm6">
                        <span>{this.props.value}</span>
                    </div>
                </div>
            </div>
        )
    }
}



interface DetailsItemProps<T> {
    model: T;
    attrConfig: IDetailsAttributeConfig<T>[];
    viewPrefModel: ViewPreferencesModel;
}

@observer
class MEPNRDialogItems<T> extends React.Component<DetailsItemProps<T>, any> {
    render() {
        let content = this.props.attrConfig.map((field: IDetailsAttributeConfig<T>) => {
            if (field.onRender) {
                return field.onRender(this.props.model);
            }
            return <MEPNRSummaryDetailsAttribute label={field.name} value={this.props.model[field.key]}/>
        });
        return (
            <div className="details-item">
                {content}
            </div>
        );
    }
}

export{ MEDetailsAttribute as default, MEDetailsAttribute, MEDetailsAttributeProps, MEPNRSummaryDetailsAttribute, MEPNRDialogItems };
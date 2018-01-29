import * as React from "react";
import { observer } from "mobx-react";
import IRiskResumeSearchRequest from "../IRiskResumeSearchRequest";
import IRiskResumeSearchRequestModel from "../IRiskResumeSearchRequestModel";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import "./RiskResumeSearchActions.scss";

interface IRiskResumeSearchActionsProps {
    searchRequest: IRiskResumeSearchRequestModel;
    onSubmit?: (request : IRiskResumeSearchRequest) => void;
    onClear?: () => void;
}

@observer
class RiskResumeSearchActions extends React.Component<IRiskResumeSearchActionsProps, any> {
    _handleSubmit = () => {
        this.props.searchRequest.submit(this.props.onSubmit);
    };
    _handleClear = () => {
        this.props.searchRequest.clear();
        if(this.props.onClear) {
            this.props.onClear();
        }
    };
    render() {
        return (
            <div className="risk-resume-search-actions">
                <PrimaryButton
                    className="risk-resume-search-action"
                    disabled={!this.props.searchRequest.isValueSpecified}
                    onClick={this._handleSubmit}
                    iconProps={{ iconName: "Search" }}>Search</PrimaryButton>
                <PrimaryButton
                    className="risk-resume-search-action"
                    onClick={this._handleClear}
                    disabled={!this.props.searchRequest.isValueSpecified}
                    iconProps={{ iconName: "Clear" }}>Clear</PrimaryButton>
            </div>
        );
    }
}

export { RiskResumeSearchActions as default, RiskResumeSearchActions };
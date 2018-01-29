import * as React from "react";
import { observer } from "mobx-react";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import IMasterEntitySearchRequestModel from "../IMasterEntitySearchRequestModel";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import "./MasterEntitySearchRequestActions.scss";

interface IMasterEntitySearchRequestActionsProps {
    searchRequest: IMasterEntitySearchRequestModel;
    onSubmit?: (request : IMasterEntitySearchRequest) => void;
    onClear?: () => void;
}

@observer
class MasterEntitySearchRequestActions extends React.Component<IMasterEntitySearchRequestActionsProps, any> {
    _handleSubmit = () => {
        this.props.searchRequest.submit(this.props.onSubmit);
    }
    _handleClear = () => {
        this.props.searchRequest.clear();
        if(this.props.onClear) {
            this.props.onClear();
        }
    }
    render() {
        return (
            <div className="master-entity-search-actions">
                <PrimaryButton
                    className="master-entity-search-action"
                    disabled={!this.props.searchRequest.isValueSpecified}
                    onClick={this._handleSubmit}
                    iconProps={{ iconName: "Search" }}>Search</PrimaryButton>
                <PrimaryButton
                    className="master-entity-search-action"
                    onClick={this._handleClear}
                    disabled={!this.props.searchRequest.isValueSpecified}
                    iconProps={{ iconName: "Clear" }}>Clear</PrimaryButton>
            </div>
        );
    }
}

export { MasterEntitySearchRequestActions as default, MasterEntitySearchRequestActions };
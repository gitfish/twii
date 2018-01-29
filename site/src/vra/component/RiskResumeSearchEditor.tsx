import * as React from "react";
import { observer } from "mobx-react";
import IRiskResumeSearchRequestModel from "../IRiskResumeSearchRequestModel";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import SystemIdTypeRefList from "common/ref/SystemIdTypeRefList";
import ValidationErrors from "common/component/ValidationErrors";

interface IRiskResumeSearchEditorProps {
    searchRequest: IRiskResumeSearchRequestModel;
}

@observer
class RiskResumeSearchEditor extends React.Component<IRiskResumeSearchEditorProps, any> {
    _handleIdTypeChange = (option : IDropdownOption) => {
        this.props.searchRequest.setIdType(String(option.key));
    };
    _handleIdChange = (value : string) => {
        this.props.searchRequest.setId(value);
    };
    render() {
        const idTypeOptions = SystemIdTypeRefList.itemsSorted;
        return (
            <div className="risk-resume-search-editor">
                <ValidationErrors errors={this.props.searchRequest.validationErrors} />
                <div className="ms-Grid" >
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                            <Dropdown label="ID Type" options={idTypeOptions} onChanged={this._handleIdTypeChange} selectedKey={this.props.searchRequest.idType || ""} />
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                            <TextField label="ID" onChanged={this._handleIdChange} value={this.props.searchRequest.id || ""} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { RiskResumeSearchEditor as default, RiskResumeSearchEditor };
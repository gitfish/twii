import * as React from "react";
import { observer } from "mobx-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { MomentField } from "common/component/MomentField";
import { ISmartGateSearchRequest } from "../ISmartGateSearchRequest";
import { ISmartGateSearchRequestModel } from "../ISmartGateSearchRequestModel";
import { getStyles, ISmartGateSearchRequestFormStyles } from "./SmartGateSearchRequestForm.styles";
import { getClassNames, ISmartGateSearchRequestFormClassNames } from "./SmartGateSearchRequestForm.classNames";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import * as moment from "moment";

interface ISmartGateRequestProps {
    request: ISmartGateSearchRequestModel;
    styles?: ISmartGateSearchRequestFormStyles;
    classNames?: ISmartGateSearchRequestFormClassNames;
    className?: string;
}

@observer
class SmartGateSearchRequestEditor extends React.Component<ISmartGateRequestProps, any> {
    private _onTravelDocIdChange = (value : string) => {
        this.props.request.setTravelDocId(value);
    }
    private _onFirstNameChange = (value : string) => {
        this.props.request.setFirstName(value);
    }
    private _onFamilyNameChange = (value : string) => {
        this.props.request.setFamilyName(value);
    }
    private _onDateOfBirthChange = (value : moment.Moment) => {
        this.props.request.setDateOfBirthMoment(value);
    }
    private _onGenderChange = (opt : IDropdownOption) => {
        this.props.request.setGender(opt.key as string);
    }
    render() {
        let classNames = this.props.classNames;
        if(!classNames) {
            classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        }
        const genderOptions : IDropdownOption[] = [
            {
                key: "",
                text: "All"
            },
            {
                key: "MALE",
                text: "Male"
            },
            {
                key: "FEMALE",
                text: "Female"
            }
        ];
        return (
            <div className={classNames.editor}>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <TextField label="First Name" onChanged={this._onFirstNameChange} value={this.props.request.firstName || ""} data-automation-id="smartGateSearchFirstName" />
                        </div>
                        <div className="ms-Grid-col ms-sm6">
                            <TextField label="Last Name" onChanged={this._onFamilyNameChange} value={this.props.request.familyName || ""} data-automation-id="smartGateSearchFamilyName" />
                        </div>
                    </div>
                </div>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <MomentField label="Date of Birth" onChange={this._onDateOfBirthChange} value={this.props.request.dateOfBirthMoment} data-automation-id="smartGateSearchDateOfBirth" />
                        </div>
                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown label="Gender" options={genderOptions} onChanged={this._onGenderChange} selectedKey={this.props.request.gender || ""} data-automation-id="smartGateSearchGender" />
                        </div>
                    </div>
                </div>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <TextField label="Travel Document ID" onChanged={this._onTravelDocIdChange} value={this.props.request.travelDocId || ""} data-automation-id="smartGateSearchTravelDocId" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface ISmartGateSearchRequestFormProps extends ISmartGateRequestProps {
    onSubmit: (request : ISmartGateSearchRequest) => void;
    onClear?: () => void;
}

class SmartGateSearchRequestActions extends React.Component<ISmartGateSearchRequestFormProps, any> {
    private _onClickClear = () => {
        this.props.request.clear();
        if(this.props.onClear) {
            this.props.onClear();
        }
    }
    private _onClickSearch = () => {
        this.props.request.submit(this.props.onSubmit);
    }
    render() {
        return (
            <div className={this.props.classNames ? this.props.classNames.actions : undefined}>
                <PrimaryButton onClick={this._onClickSearch} className="action" iconProps={{ iconName: "Search" }}>Search</PrimaryButton>
                <PrimaryButton onClick={this._onClickClear} className="action" iconProps={{ iconName: "Cancel" }}>Clear</PrimaryButton>
            </div>
        );
    }
}

class SmartGateSearchRequestForm extends React.Component<ISmartGateSearchRequestFormProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter) {
            this.props.request.submit(this.props.onSubmit);
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root} onKeyDown={this._onKeyDown}>
                <SmartGateSearchRequestEditor {...this.props} classNames={classNames} />
                <SmartGateSearchRequestActions {...this.props} classNames={classNames} />
            </div>
        )
    }
}

export { SmartGateSearchRequestForm, SmartGateSearchRequestEditor }
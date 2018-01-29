import * as React from "react";
import { observer } from "mobx-react";
import IPNRSearchRequest from "../IPNRSearchRequest";
import IPNRSearchRequestModel from "../IPNRSearchRequestModel";
import Details from "common/component/Details";
import ValidationErrors from "common/component/ValidationErrors";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import MomentField from "common/component/MomentField";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { css } from "@uifabric/utilities/lib/css";
import { ClassNames } from "./PNRSearchRequest.style";
import { DefinitionListGroup, IFieldProps, createGroupItems } from "common/component/DefinitionListGroup";
import { dataToOutputText } from "util/Date";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import * as moment from "moment";

const Labels = {
    recordLocator: "Record Locator",
    familyName: "Family Name(s)",
    givenName: "Given Name(s)",
    dateOfBirth: "Date of Birth",
    age: "Age",
    ageFrom: "Age From",
    ageTo: "Age To",
    travelDocId: "Travel Document(s)",
    travelDocCountryCode: "Country of Issue Code(s)",
    departureDateFrom: "Departure Date From",
    departureDateTo: "Departure Date To",
    departureCarrier: "Departure Carrier(s)",
    originRouteId: "Departure Route(s)",
    originCityPort: "Departure Port(s)",
    arrivalDateFrom: "Arrival Date From",
    arrivalDateTo: "Arrival Date To",
    arrivalCarrier: "Arrival Carrier(s)",
    destinationRouteId: "Arrival Route(s)",
    destinationPort: "Arrival Port(s)"
}

interface IPNRSearchRequestSummaryProps {
    searchRequest: IPNRSearchRequest;
}

const PNRSearchRequestFields : IFieldProps[] = [
    {
        key: "recordLocator",
        name: Labels.recordLocator
    },
    {
        key: "familyName",
        name: Labels.familyName
    },
    {
        key: "givenName",
        name: Labels.givenName
    },
    {
        key: "dateOfBirth",
        name: Labels.dateOfBirth,
        onRender(value) {
            return dataToOutputText(value.dateOfBirth);
        }
    },
    {
        key: "ageFrom",
        name: Labels.ageFrom
    },
    {
        key: "ageTo",
        name: Labels.ageTo
    },
    {
        key: "travelDocId",
        name: Labels.travelDocId
    },
    {
        key: "travelDocCountryCode",
        name: Labels.travelDocCountryCode
    },
    {
        key: "departureCarrier",
        name: Labels.departureCarrier
    },
    {
        key: "originRouteId",
        name: Labels.originRouteId
    },
    {
        key: "originCityPort",
        name: Labels.originCityPort
    },
    {
        key: "departureDateFrom",
        name: Labels.departureDateFrom,
        onRender(value) {
            return dataToOutputText(value.departureDateFrom);
        }
    },
    {
        key: "departureDateTo",
        name: Labels.departureDateTo,
        onRender(value) {
            return dataToOutputText(value.departureDateTo);
        }
    },
    {
        key: "arrivalCarrier",
        name: Labels.arrivalCarrier
    },
    {
        key: "destinationRouteId",
        name: Labels.destinationRouteId
    },
    {
        key: "destinationPort",
        name: Labels.destinationPort
    },
    {
        key: "arrivalDateFrom",
        name: Labels.arrivalDateFrom,
        onRender(value) {
            return dataToOutputText(value.arrivalDateFrom);
        }
    },
    {
        key: "arrivalDateTo",
        name: Labels.arrivalDateTo,
        onRender(value) {
            return dataToOutputText(value.arrivalDateTo);
        }
    }
];

const createSearchRequestSummaryItems = (searchRequest : IPNRSearchRequest) => {
    return createGroupItems({ inline: true, value: searchRequest, fields: PNRSearchRequestFields });
};

class PNRSearchRequestSummary extends React.Component<IPNRSearchRequestSummaryProps, any> {
    render() {
        return <DefinitionListGroup inline={true} className={css(ClassNames.summary, "pnr-search-request-summary")} value={this.props.searchRequest} fields={PNRSearchRequestFields} />; 
    }
}

interface IPNRSearchRequestProps {
    searchRequest: IPNRSearchRequestModel;
}

@observer
class PNRSearchRecordEditor extends React.Component<IPNRSearchRequestProps, any> {
    private _onRecordLocatorChanged = (value : string) => {
        this.props.searchRequest.setRecordLocator(value);
    }
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className="pnr-search-record-editor">
                <TextField className="record-locator-field" label="Record Locator" onChanged={this._onRecordLocatorChanged} value={searchRequest.recordLocator || ""} />
            </div>
        );
    }
}

@observer
class PNRSearchPersonAgeRangeEditor extends React.Component<IPNRSearchRequestProps, any> {
    private _onRenderAgeToLabel = (props : ITextFieldProps) => {
        // blank label
        return <Label>{"\u2008"}</Label>;
    }
    private _onAgeFromChanged = (value : string) => {
        this.props.searchRequest.setAgeFrom(value);
    }
    private _onAgeToChanged = (value : string) => {
        this.props.searchRequest.setAgeTo(value);
    }
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className={css("pnr-search-person-age-range-editor", ClassNames.personAgeRangeEditor)} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <TextField className="age-from-field" label="Age" placeholder="From" onChanged={this._onAgeFromChanged} value={searchRequest.ageFrom || ""} size={6} />
                <TextField className="age-to-field" onRenderLabel={this._onRenderAgeToLabel} placeholder="To" onChanged={this._onAgeToChanged} value={searchRequest.ageTo || ""} size={6} />
            </div>
        );
    }
}

@observer
class PNRSearchPersonEditor extends React.Component<IPNRSearchRequestProps, any> {
    private _onFamilyNameChanged = (value : string) => {
        this.props.searchRequest.setFamilyName(value);
    }
    private _onGivenNameChanged = (value : string) => {
        this.props.searchRequest.setGivenName(value);
    }
    private _onDateOfBirthChanged = (value : moment.Moment) => {
        this.props.searchRequest.setDateOfBirth(value);
    }
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className={css("pnr-search-person-editor", ClassNames.personEditor)}>
                <TextField className="family-name-field" label="Family Name(s)" onChanged={this._onFamilyNameChanged} value={searchRequest.familyName || ""} />
                <TextField className="given-name-field" label="Given Name(s)" onChanged={this._onGivenNameChanged} value={searchRequest.givenName || ""} />
                <div className="dobOrAgeSection" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <MomentField className="date-of-birth-field" label="Date of Birth" onChange={this._onDateOfBirthChanged} value={searchRequest.dateOfBirth} />
                    <div style={{ paddingLeft: "16px", paddingRight: "16px"}}><strong>or</strong></div>
                    <PNRSearchPersonAgeRangeEditor {...this.props} />
                </div>
            </div>
        );
    }
}

@observer
class PNRSearchTravelDocEditor extends React.Component<IPNRSearchRequestProps, any> {
    private _onTravelDocIdChanged = (value : string) => {
        this.props.searchRequest.setTravelDocId(value);
    }
    private _onTravelDocCountryCodeChanged = (value : string) => {
        this.props.searchRequest.setTravelDocCountryCode(value);
    }
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className={css("pnr-search-travel-doc-editor")}>
                <TextField className="travel-doc-id-field" label="Travel Document(s)" onChanged={this._onTravelDocIdChanged} value={searchRequest.travelDocId || ""} />
                <TextField className="travel-doc-country-code-field" label="Country of Issue Code(s)" onChanged={this._onTravelDocCountryCodeChanged} value={searchRequest.travelDocCountryCode || ""} />
            </div>
        );
    }
}

@observer
class PNRSearchDepartureEditor extends React.Component<IPNRSearchRequestProps, any> {
    private _onCarrierChanged = (value : string) => {
        this.props.searchRequest.setDepartureCarrier(value);
    }
    private _onRouteChanged = (value : string) => {
        this.props.searchRequest.setOriginRouteId(value);
    }
    private _onPortChanged = (value : string) => {
        this.props.searchRequest.setOriginCityPort(value);
    }
    private _onFromDateChanged = (value : moment.Moment) => {
        this.props.searchRequest.setDepartureDateFrom(value);
    }
    private _onToDateChanged = (value : moment.Moment) => {
        this.props.searchRequest.setDepartureDateTo(value);
    }
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className={css("pnr-search-departure-editor")}>
                <TextField className="departure-carrier-field" label="Carrier(s)" onChanged={this._onCarrierChanged} value={searchRequest.departureCarrier || ""} />
                <TextField className="departure-route-id-field" label="Route(s)" onChanged={this._onRouteChanged} value={searchRequest.originRouteId || ""} />
                <TextField className="departure-port-field" label="Port(s)" onChanged={this._onPortChanged} value={searchRequest.originCityPort || ""} />
                <div className="departure-date-range">
                    <Label >Date</Label>
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <MomentField className="departure-date-from-field" placeholder="From" onChange={this._onFromDateChanged} value={searchRequest.departureDateFrom} />
                        <div style={{ paddingLeft: "16px", paddingRight: "16px", marginBottom: "8px" }}>to</div>
                        <MomentField className="departure-date-to-field" placeholder="To" onChange={this._onToDateChanged} value={searchRequest.departureDateTo} />
                    </div>
                </div>
            </div>
        );
    }
}

@observer
class PNRSearchArrivalEditor extends React.Component<IPNRSearchRequestProps, any> {
    private _onCarrierChanged = (value : string) => {
        this.props.searchRequest.setArrivalCarrier(value);
    }
    private _onRouteChanged = (value : string) => {
        this.props.searchRequest.setDestinationRouteId(value);
    }
    private _onPortChanged = (value : string) => {
        this.props.searchRequest.setDestinationPort(value);
    }
    private _onFromDateChanged = (value : moment.Moment) => {
        this.props.searchRequest.setArrivalDateFrom(value);
    }
    private _onToDateChanged = (value : moment.Moment) => {
        this.props.searchRequest.setArrivalDateTo(value);
    }
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className={css("pnr-search-arrival-editor")}>
                <TextField className="arrival-carrier-field" label="Carrier(s)" onChanged={this._onCarrierChanged} value={searchRequest.arrivalCarrier || ""} />
                <TextField className="arrival-route-id-field" label="Route(s)" onChanged={this._onRouteChanged} value={searchRequest.destinationRouteId || ""} />
                <TextField className="arrival-port-field" label="Port(s)" onChanged={this._onPortChanged} value={searchRequest.destinationPort || ""} />
                <div className="arrival-date-range">
                    <Label >Date</Label>
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <MomentField className="arrival-date-from-field" placeholder="From" onChange={this._onFromDateChanged} value={searchRequest.arrivalDateFrom} />
                        <div style={{ paddingLeft: "16px", paddingRight: "16px", marginBottom: "8px" }}>to</div>
                        <MomentField className="arrival-date-to-field" placeholder="To" onChange={this._onToDateChanged} value={searchRequest.arrivalDateTo} />
                    </div>
                </div>
            </div>
        );
    }
}

@observer
class PNRSearchRequestEditor extends React.Component<IPNRSearchRequestProps, any> {
    private _onRecordSectionChange = (open : boolean) => {
        this.props.searchRequest.setRecordSectionOpen(open);
    }
    private _onPersonSectionChange = (open : boolean) => {
        this.props.searchRequest.setPersonSectionOpen(open);
    }
    private _onTravelDocSectionChange = (open : boolean) => {
        this.props.searchRequest.setTravelDocSectionOpen(open);
    }
    private _onDepartureSectionChange = (open : boolean) => {
        this.props.searchRequest.setDepartureSectionOpen(open);
    }
    private _onArrivalSectionChange = (open : boolean) => {
        this.props.searchRequest.setArrivalSectionOpen(open);
    }
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className={css("pnr-search-request-editor", ClassNames.editor)}>
                <ValidationErrors errors={searchRequest.validationErrors} />

                <div className="editor-section" style={{ display: "flex", alignItems: "stretch" }}>
                    <div className="editor-section-column" style={{ width: "100%" }}>
                        <div className="editor-section-cell">
                            <Details title="Record" open={searchRequest.recordSectionOpen} controlOnHeaderClick={true} onOpenChange={this._onRecordSectionChange}>
                                <PNRSearchRecordEditor {...this.props} />
                            </Details>
                        </div>
                    </div>
                </div>

                <div className="editor-section" style={{ display: "flex", alignItems: "stretch" }}>
                    <div className="editor-section-column" style={{ width: "50%" }}>
                        <div className="editor-section-cell">
                            <Details title="Person" open={searchRequest.personSectionOpen} controlOnHeaderClick={true} onOpenChange={this._onPersonSectionChange}>
                                <PNRSearchPersonEditor {...this.props} />
                            </Details>
                        </div>
                    </div>
                    <div className="editor-section-column" style={{ width: "50%" }}>
                        <div className="editor-section-cell">
                            <Details title="Travel Document" open={searchRequest.travelDocSectionOpen} controlOnHeaderClick={true} onOpenChange={this._onTravelDocSectionChange}>
                                <PNRSearchTravelDocEditor {...this.props} />
                            </Details>
                        </div>
                    </div>
                </div>
                
                <div className="editor-section" style={{ display: "flex", alignItems: "stretch" }}>
                    <div className="editor-section-column" style={{ width: "50%" }}>
                        <div className="editor-section-cell">
                            <Details title="Departure" open={searchRequest.departureSectionOpen} controlOnHeaderClick={true} onOpenChange={this._onDepartureSectionChange}>
                                <PNRSearchDepartureEditor {...this.props} />
                            </Details>
                        </div>
                    </div>
                    <div className="editor-section-column" style={{ width: "50%" }}>
                        <div className="editor-section-cell">
                            <Details title="Arrival" open={searchRequest.arrivalSectionOpen} controlOnHeaderClick={true} onOpenChange={this._onArrivalSectionChange}>
                                <PNRSearchArrivalEditor {...this.props} />
                            </Details>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface IPNRSearchContainerProps extends IPNRSearchRequestProps {
    onSubmit?: (searchRequest : IPNRSearchRequest) => void;
    onClear?: () => void;
}

@observer
class PNRSearchRequestActions extends React.Component<IPNRSearchContainerProps, any> {
    private _onSubmit = () => {
        this.props.searchRequest.submit(this.props.onSubmit);
    }
    private _onClear = () => {
        this.props.searchRequest.clear();
        if(this.props.onClear) {
            this.props.onClear();
        }
    }
    render() {
        return (
            <div className={css("pnr-search-actions", ClassNames.actions)}>
                <PrimaryButton
                    className="pnr-search-action"
                    disabled={!this.props.searchRequest.isValueSpecified}
                    onClick={this._onSubmit}
                    iconProps={{ iconName: "Search" }}>Search</PrimaryButton>
                <PrimaryButton
                    className="pnr-search-action"
                    onClick={this._onClear}
                    disabled={!this.props.searchRequest.isValueSpecified}
                    iconProps={{ iconName: "Clear" }}>Clear</PrimaryButton>
            </div>
        );
    }
}

@observer
class PNRSearchRequestContainer extends React.Component<IPNRSearchContainerProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter) {
            this.props.searchRequest.submit(this.props.onSubmit);
        }
    }
    render() {
        return (
            <div className="pnr-search-container" onKeyDown={this._onKeyDown}>
                <PNRSearchRequestEditor searchRequest={this.props.searchRequest} />
                <PNRSearchRequestActions {...this.props} />
            </div>
        )
    }
}

export {
    PNRSearchRequestContainer as default,
    PNRSearchRequestContainer,
    PNRSearchRequestEditor,
    PNRSearchRequestActions,
    PNRSearchRequestSummary,
    createSearchRequestSummaryItems
}
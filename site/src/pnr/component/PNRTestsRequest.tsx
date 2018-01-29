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
import { ClassNames } from "./PNRTestsRequest.style";
import { DefinitionListGroup, IFieldProps, createGroupItems } from "common/component/DefinitionListGroup";
import { dataToOutputText } from "util/Date";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import * as moment from "moment";

interface IPNRTestsRequestProps {
    pnrTestsRequest: IPNRSearchRequestModel;
}

interface IPNRSearchContainerProps extends IPNRTestsRequestProps {
    onSubmit?: (pnrTestsRequest : IPNRSearchRequest) => void;
}

@observer
class PNRTestsRequestActions extends React.Component<IPNRSearchContainerProps, any> {
    private _onSubmit = () => {
        this.props.pnrTestsRequest.submit(this.props.onSubmit);
        console.log("_onSubmit : this.props.pnrTestsRequest.submit(this.props.onSubmit)");
    }

    render() {
        return (
            <div className={css("pnr-search-actions", ClassNames.actions)}>
                <PrimaryButton
                    className="pnr-search-action"
                    disabled={false}
                    onClick={this._onSubmit}
                    iconProps={{ iconName: "Load" }}>Retrieve Ticket Payments</PrimaryButton>
            </div>
            
        );
    }
}

@observer
class PNRTestsRequestActionsTwo extends React.Component<IPNRSearchContainerProps, any> {
    private _onSubmit = () => {
        this.props.pnrTestsRequest.submit(this.props.onSubmit);
        console.log("_onSubmit : this.props.pnrTestsRequest.submit(this.props.onSubmit)");
    }

    render() {
        return (
            <div className={css("pnr-search-actions", ClassNames.actions)}>
                <PrimaryButton
                    className="pnr-search-action"
                    disabled={false}
                    onClick={this._onSubmit}
                    iconProps={{ iconName: "Load" }}>Retrieve Ticketing</PrimaryButton>
            </div>
            
        );
    }
}


@observer
class PNRTestsRequestContainer extends React.Component<IPNRSearchContainerProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter) {
            this.props.pnrTestsRequest.submit(this.props.onSubmit);
        }
    }
    render() {
        return (
            <div className="pnr-search-container" onKeyDown={this._onKeyDown}>
                <PNRTestsRequestActions {...this.props} />
            </div>
        )
    }
}

@observer
class PNRTestsRequestContainerTwo extends React.Component<IPNRSearchContainerProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter) {
            this.props.pnrTestsRequest.submit(this.props.onSubmit);
        }
    }
    render() {
        return (
            <div className="pnr-search-container" onKeyDown={this._onKeyDown}>
                <PNRTestsRequestActionsTwo {...this.props} />
            </div>
        )
    }
}

export {
    PNRTestsRequestContainerTwo as default,
    PNRTestsRequestContainerTwo,
    PNRTestsRequestContainer, 
    PNRTestsRequestActions
}
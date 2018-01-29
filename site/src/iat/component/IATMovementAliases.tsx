import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import * as DateUtils from "util/Date";
import Error from "common/component/Error";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import SourceSystemCdRef from "refdata/SourceSystemCd";
import IIATAlias from "../IIATAlias";
import { Details } from "common/component/Details";
import * as Icons from "icon/AnalystDesktopIcons";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import IATMovementAliasesStore from "../IATMovementAliasesStore";
import {IIATMovementAliasesModel} from "../IIATMovementAliasesModel";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import DetailsAttribute from "common/component/DetailsAttribute";
import DetailsItem from "common/component/DetailsItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";
import "./IATMovementAliases.scss";

const Fields: IDetailsAttributeConfig<IIATAlias>[] = [{
    key: "iatTravellerID",
    name: "IAT Traveller Id"
}, {
    key: "aliasSequenceNbr",
    name: "Alias Sequence Number"
}, {
    key: "familyName",
    name: "Family Name"
}, {
    key: "givenNames",
    name: "Given Names"
}, {
    key: "birthDate",
    name: "Birth Date",
    onRender: function(item: IIATAlias) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.birthDate)}/>;
    }
}, {
    key: "birthDeptCountryCode",
    name: "Birth Country"
}, {
    key: "sexCode",
    name: "Gender",
    onRender: function(item: IIATAlias) {
        return <DetailsAttribute key={this.key} label={this.name} value={NameGenderCdRef[item.sexCode]}/>;
    }
}, {
    key: "maritalStatusCode",
    name: "Marital Status"
}, {
    key: "birthNameInd",
    name: "Birth Name Ind"
}, {
    key: "citizenshipNameInd",
    name: "Citizenship Name Ind"
}, {
    key: "currentNameInd",
    name: "Current Name Ind"
}, {
    key: "deptPersonIDInd",
    name: "Dept Person Id Ind"
}, {
    key: "additionalAliasInd",
    name: "Additional Alias Ind"
}, {
    key: "dimiaAliasInd",
    name: "DIMIA Alias Ind"
}, {
    key: "lastUpdateDate",
    name: "Last Update Date",
    onRender: function(item: IIATAlias) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.lastUpdateDate)}/>;
    }
}, {
    key: "sourceFileCode",
    name: "Source File Code"
}, {
    key: "sourceSystemCode",
    name: "Sourced From",
    onRender: function(item: IIATAlias) {
        return <DetailsAttribute key={this.key} label={this.name} value={SourceSystemCdRef.getDesc(item.sourceSystemCode)}/>;
    }
}];

const IATMovementAliasesViewPrefsStore = new ViewPreferencesModel("iatMovementAliases");

interface IIATMovementAliasesProps {
    model?: IIATMovementAliasesModel;
}

@observer
class IATMovementAliases extends React.Component<IIATMovementAliasesProps, any> {
    render() {
        let content;
        if(this.props.model.total > 0) {
            content = this.props.model.items.map((alias: IIATAlias, idx: number) => {
                return <DetailsItem key={idx} model={alias} attrConfig={Fields} viewPrefModel={IATMovementAliasesViewPrefsStore}/>;
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>Movement does not have aliases recorded</MessageBar>;
        }
        return <div className="iat-movement-aliases">{content}</div>
    }
}

class IATMovementAliasesContainer extends React.Component<IIATMovementAliasesProps, any> {
    private _onRenderDone = () => {
        return <IATMovementAliases {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} syncLabel="Loading Aliases..." onRenderDone={this._onRenderDone} />;
    }
}

@observer
class IATMovementAliasesPanel extends React.Component<IIATMovementAliasesProps, any> {
    private _onPanelClose = () => {
        this.props.model.setVisible(false);
    }
    render() {
        return (
            <Panel isOpen={true} isLightDismiss={true} type={ PanelType.custom }
                   customWidth='800px' headerText='Aliases' onDismiss={this._onPanelClose}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.IAT/>} {'Aliases'}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("iat-movement-aliases-header")}
                         bodyClassName="iat-movement-aliases-body">
                    <CommandBar items={[]} farItems={[createViewPreferencesMenuItem(IATMovementAliasesViewPrefsStore, Fields)]} />
                    <IATMovementAliasesContainer {...this.props} />
                </Details>
            </Panel>
        );
    }
}

export{ IATMovementAliasesPanel as default, IATMovementAliasesPanel, IIATMovementAliasesProps };
import * as React from 'react';
import { observer } from "mobx-react";
import { Details } from "common/component/Details";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as Icons from "icon/AnalystDesktopIcons";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import {
    DetailsList,
    CheckboxVisibility,
    DetailsRow,
    SelectionMode,
    IDetailsRowProps,
} from "office-ui-fabric-react/lib/DetailsList";
import Error from "common/component/Error";
import {IColumn} from "office-ui-fabric-react/lib/DetailsList";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import "./VisaHistory.scss";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import {CruiseVisaDataHistoryColumns1, CruiseVisaDataHistoryColumns2} from "me/component/visahistory/VisaHistoryColumns";

interface IMEHistoricalIATTravellersProps {
    model: ITravellerHistoryModel;
}


@observer
class CruiseVisaHistory extends React.Component<IMEHistoricalIATTravellersProps, any> {

    private _onRenderRow = (props : IDetailsRowProps) => {
        const row = <DetailsRow {...props} />;
        return <div className={css("visa-history-rows")}>{row}</div>;
    };

    render() {
        let content = <MessageBar messageBarType={MessageBarType.info}>No data available to display</MessageBar>;
        let content1 = <MessageBar messageBarType={MessageBarType.info}>No data available to display</MessageBar>;

        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            if (this.props.model.visas.length > 0) {
                content = <DetailsList columns={CruiseVisaDataHistoryColumns1}
                                   compact={true} onRenderRow={this._onRenderRow}
                                   checkboxVisibility={CheckboxVisibility.hidden}
                                   selectionMode={SelectionMode.none}
                                   items={this.props.model.visas}/>
                content1 =   <DetailsList columns={CruiseVisaDataHistoryColumns2}
                                      compact={true} onRenderRow={this._onRenderRow}
                                      checkboxVisibility={CheckboxVisibility.hidden}
                                      selectionMode={SelectionMode.none}
                                      items={this.props.model.visas}/>
            }
        }
            return(
            <Details className={css("visas", "me-section")}
                     summary={<div>{<Icons.BOOKINGS/>} {'Visa History'}</div>}
                     open={true}
                     controlOnHeaderClick={true}
                     headerClassName={css("visas-ribbon")}>
                {content}
                {content1}
            </Details>

        );
    }
}
export {CruiseVisaHistory as default, CruiseVisaHistory}


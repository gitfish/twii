import * as React from 'react';
import { observer } from "mobx-react";
import { Details } from "common/component/Details";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as Icons from "icon/AnalystDesktopIcons";
import "./TravellerSummary.scss";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import Error from "common/component/Error";
import IMESummaryModel from "me/summary/IMESummaryModel";
import {travellerSummaryColumns1} from "./TravelSummaryColumns1";
import {travellerSummaryColumns2} from "./TravelSummaryColumns2";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import {
    DetailsList,
    CheckboxVisibility,
    SelectionMode,
    DetailsRow,
    IDetailsRowProps,
} from "office-ui-fabric-react/lib/DetailsList";

interface ITravellerSummaryProps {
    model: IMESummaryModel;
}


@observer
class TravellerSummary extends React.Component<ITravellerSummaryProps, any> {

    private _onRenderRow = (props : IDetailsRowProps) => {
        const row = <DetailsRow {...props} />;
        return <div className={css("traveller-summary-rows")}>{row}</div>;
    };

    render() {
        let content = <MessageBar messageBarType={MessageBarType.info}>No data available to display </MessageBar>;
        let content1 = <MessageBar messageBarType={MessageBarType.info}>No data available to display </MessageBar>;

        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            if (this.props.model.travelSummaryItems.length > 0) {
                    content = <DetailsList columns={travellerSummaryColumns1}
                                   compact={true}
                                   onRenderRow={this._onRenderRow}
                                   checkboxVisibility={CheckboxVisibility.hidden}
                                   selectionMode={SelectionMode.none}
                                   items={this.props.model.travelSummaryItems}/>
                    content1 =   <DetailsList columns={travellerSummaryColumns2}
                                      compact={true}
                                      onRenderRow={this._onRenderRow}
                                      checkboxVisibility={CheckboxVisibility.hidden}
                                       selectionMode={SelectionMode.none}
                                      items={this.props.model.travelSummaryItems}/>
            }
        }
            return(
            <Details className={css("traveller-summary", "me-section")}
                     summary={<div>{<Icons.BOOKINGS/>} {'Traveller Summary'}</div>}
                     open={true}
                     controlOnHeaderClick={true}
                     headerClassName={css("traveller-summary-ribbon")}>
                {content}
                {content1}
            </Details>

        );
    }
}
export {TravellerSummary as default, TravellerSummary}


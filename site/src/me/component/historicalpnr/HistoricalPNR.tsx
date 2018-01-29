import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import "./HistoricalPNR.scss";
import IMETSPNRModel from "me/travellersummary/IMETSPNRModel";
import historyPNRColumns from "./HistoryPNRColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IHistoricalDataProps {
    model: IMETSPNRModel;
}

@observer
class HistoricalPNR extends React.Component<IHistoricalDataProps, any> {

    render() {
        let displayPanel;
            displayPanel = <MEDetailsList icon={<Icons.HISTORICALPNR/>}
                                          label="Historical PNR"
                                          className="historical-pnr"
                                          columns={historyPNRColumns}
                                          items={this.props.model.pnrRecords}
                                          sync={this.props.model.sync}/>
        return ( displayPanel );
    }

}


export {HistoricalPNR as default, HistoricalPNR}

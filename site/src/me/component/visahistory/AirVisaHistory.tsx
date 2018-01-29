import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import "./VisaHistory.scss";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import MEDetailsList from "me/component/MEDetailsList";
import {AirVisaDataHistoryColumns} from "me/component/visahistory/VisaHistoryColumns";

interface IMEHistoricalIATTravellersProps {
    model: ITravellerHistoryModel;
}


@observer
class AirVisaHistory extends React.Component<IMEHistoricalIATTravellersProps, any> {

    render() {
        return(
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                           label="Visa History"
                           className="visas"
                           columns={AirVisaDataHistoryColumns}
                           items={this.props.model.visas}
                           sync={this.props.model.sync}/>
        );
    }
}
export {AirVisaHistory as default, AirVisaHistory}
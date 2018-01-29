import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import "./PassportHistory.scss";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import MEDetailsList from "me/component/MEDetailsList";

interface IMEHistoricalIATTravellersProps {
    model: ITravellerHistoryModel;
    passportDataColumns? : any;
}


@observer
class METSPassportHistory extends React.Component<IMEHistoricalIATTravellersProps, any> {

    render() {

        return(
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                       label="Passport History"
                       className="passports"
                       columns={this.props.passportDataColumns}
                       items={this.props.model.passports}
                       sync={this.props.model.sync}/>

        );
    }
}
export {METSPassportHistory as default, METSPassportHistory}
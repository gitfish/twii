import * as React from "react";
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import IMESummaryModel from "../../summary/IMESummaryModel";
import otherServiceInformationColumns from "./OtherServiceInformationColumns";
import "./OtherServiceInformation.scss";
import MEDetailsList from "me/component/MEDetailsList";

interface OSISummaryProps {
    model: IMESummaryModel;
}


@observer
class OtherServiceInformation extends React.Component<OSISummaryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                       label="OSI-Other Service Information"
                       className="other-service-information"
                       columns={otherServiceInformationColumns}
                       items={this.props.model.otherServiceInfo}
                       sync={this.props.model.sync}/>

        );
    }
}

export { OtherServiceInformation as default, OtherServiceInformation }
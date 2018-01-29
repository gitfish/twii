import * as React from "react";
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import IMESummaryModel from "../../summary/IMESummaryModel";
import specialServiceRequestColumns from "./SpecialServiceRequestColumns";
import "./SpecialServiceRequest.scss";
import MEDetailsList from "me/component/MEDetailsList";

interface SSRSummaryProps {
    model: IMESummaryModel;
}


@observer
class SpecialServiceRequest extends React.Component<SSRSummaryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                           label="SSR-Special Service Request"
                           className="special-service-request"
                           columns={specialServiceRequestColumns}
                           items={this.props.model.specialServiceReqInfo}
                           sync={this.props.model.sync}/>

        );
    }
}



export { SpecialServiceRequest as default, SpecialServiceRequest }
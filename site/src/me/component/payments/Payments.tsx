import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import "./Payments.scss";
import IMESummaryModel from "../../summary/IMESummaryModel";
import paymentColumns from "./PaymentsColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IMEBookingSummaryProps {
    model: IMESummaryModel;
}


@observer
class Payments extends React.Component<IMEBookingSummaryProps, any> {

    render() {
        return(
        <MEDetailsList icon={<Icons.BOOKINGS/>}
                       label="Payment"
                       className="payments"
                       columns={paymentColumns}
                       items={this.props.model.paymentItems}
                       sync={this.props.model.sync} />
        );
    }
}
export {Payments as default, Payments}
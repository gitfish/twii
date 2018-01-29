import * as React from "react";
import { observer } from "mobx-react";
import "./MEHeader.scss";
import {IMECase} from "me/IMECase";
import IBookingRecordInfo from "risk/traveller/pnr/IBookingRecordInfo";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import * as DateUtils from "util/Date";

interface MEHeaderProps {
    headerDetails: IMECase;
    pnrSource: IBookingRecordInfo;
    onRefresh?: () => void;
    icon?: JSX.Element;
}

@observer
class MEHeader extends React.Component<MEHeaderProps, any> {
    render() {
        let leftHeader = " ";
        let pnrSource = this.props.pnrSource? this.props.pnrSource.PNRSource ?  this.props.pnrSource.PNRSource : "" : "";
        let booking = this.props.headerDetails.BookingSystemCode ? "("+this.props.headerDetails.BookingSystemCode +")": "";
        let pnrRecord = this.props.headerDetails.RecordLocator ? this.props.headerDetails.RecordLocator : "";
        let dateTS = DateUtils.dateAsStringFromMatchEvaluationDataText(this.props.headerDetails.CreationTs);
        if (pnrSource) {
            leftHeader+=pnrSource;
        }
        if (pnrRecord) {
            if (pnrSource ) {
                leftHeader+=" | " + pnrRecord;
            }
            else {
                leftHeader+=pnrRecord;
            }
        }
        if (booking) {
            if(pnrSource || pnrRecord) {
                leftHeader+=" | " + booking;
            }
            else {
                leftHeader+=booking;
            }
        }

        if (dateTS) {
            if (pnrSource || booking|| pnrRecord) {
                leftHeader += " | " + dateTS;
            }
            else {
                leftHeader += dateTS;
            }
        }
        return (
            <div className="me-header">
                <div>
                    {this.props.icon}
                    {leftHeader}
                </div>

                <div className="header-security-classification">
                    PROTECTED
                </div>
                <div>
                    {this.props.onRefresh && (
                        <IconButton title="Refresh" ariaLabel="Refresh" iconProps={{ iconName: "Refresh" }} onClick={this.props.onRefresh} className="header-refresh"/>
                    )}
                    
                </div>
            </div>
        );
    }
}

export { MEHeader as default, MEHeader }
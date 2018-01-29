import * as React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import IPNRRecordKey from "risk/traveller/pnr/IPNRRecordKey";
import * as StringUtils from "util/String";
import MESummaryStore from "me/summary/MESummaryStore";
import METSPNRStore from "me/travellersummary/METSPNRStore";
import { Label } from 'office-ui-fabric-react/lib/Label';

import {isNullOrUndefined} from "util";
import "./LinkedPNRItem.scss";

interface ILinkedPNRItemProps {
    linkedPNR?: IPNRRecordKey;
    index?: number;
}

class LinkedPNRItem extends React.Component<ILinkedPNRItemProps, any> {
    render() {
        let content;
        if ((StringUtils.isNotBlank(this.props.linkedPNR.RecordLocator))
            && (StringUtils.isNotBlank(this.props.linkedPNR.BookingSystemCode))) {
            if (!isNullOrUndefined(this.props.linkedPNR.PNRCreationTimeStamp)) {
                if (this.props.index > 0) {
                    content = <span className="linked-pnr-item"> | <Link className="linked-pnr-inline" key={this.props.linkedPNR.RecordLocator + this.props.linkedPNR.BookingSystemCode + this.props.linkedPNR.PNRCreationTimeStamp} onClick={ () => {
                    MESummaryStore.loadByLinkedPNRItem(this.props.linkedPNR);
                    METSPNRStore.setVisibility(true);
                  }}>{" "+ this.props.linkedPNR.RecordLocator + "(" + this.props.linkedPNR.BookingSystemCode + ") "}</Link></span>
                } else {
                    content = <span className="linked-pnr-item"><Link className="linked-pnr-inline"  key={this.props.linkedPNR.RecordLocator + this.props.linkedPNR.BookingSystemCode + this.props.linkedPNR.PNRCreationTimeStamp} onClick={ () => {
                     MESummaryStore.loadByLinkedPNRItem(this.props.linkedPNR);
                    METSPNRStore.setVisibility(true);
                  }}>{" "+ this.props.linkedPNR.RecordLocator + "(" + this.props.linkedPNR.BookingSystemCode + ") "}</Link></span>
                }
            } else {
                if (this.props.index > 0) {
                    content =
                        <span className="linked-pnr-item"> | <Label  className="linked-pnr-inline">{" "+ this.props.linkedPNR.RecordLocator + "(" + this.props.linkedPNR.BookingSystemCode + ") "}</Label> </span>
                } else {
                    content =
                        <span className="linked-pnr-item"><Label  className="linked-pnr-inline">{" "+ this.props.linkedPNR.RecordLocator + "(" + this.props.linkedPNR.BookingSystemCode + ") "}</Label></span>
                }
            }
        } else {
            if ((StringUtils.isNotBlank(this.props.linkedPNR.RecordLocator))) {
                if (this.props.index > 0) {
                    content = <span className="linked-pnr-item"> | <Label  className="linked-pnr-inline">{" "+ this.props.linkedPNR.RecordLocator +" "}</Label> </span>
                } else {
                    content = <span className="linked-pnr-item"><Label  className="linked-pnr-inline">{" "+ this.props.linkedPNR.RecordLocator +" "}</Label></span>
                }
            } else {
                if (this.props.index > 0) {
                    content = <span className="linked-pnr-item"> | <Label  className="linked-pnr-inline">{" "+ this.props.linkedPNR.BookingSystemCode +" "}</Label> </span>
                } else {
                    content = <span className="linked-pnr-item"><Label  className="linked-pnr-inline">{" "+ this.props.linkedPNR.BookingSystemCode + " "}</Label></span>
                }
            }
        }
        return (content);
    }
}

export { LinkedPNRItem as default, LinkedPNRItem };
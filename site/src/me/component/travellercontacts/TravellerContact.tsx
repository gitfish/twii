import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import "./TravellerContact.scss";
import MEDetailsList from "me/component/MEDetailsList";
import IMESummaryModel from "me/summary/IMESummaryModel";
import travellersContactColumns from "me/component/travellercontacts/TravellersContactColumns";

interface ITravellerContactProps {
    model: IMESummaryModel;
}


@observer
class TravellerContact extends React.Component<ITravellerContactProps, any> {

    render() {
        return(
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                           label="Contacts"
                           className="traveller-contacts"
                           columns={travellersContactColumns}
                           items={this.props.model.travelContacts}
                           sync={this.props.model.sync}/>
        );
    }
}
export {TravellerContact as default, TravellerContact}
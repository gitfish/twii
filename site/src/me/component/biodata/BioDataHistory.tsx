import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import "./BioDataHistory.scss";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import MEDetailsList from "me/component/MEDetailsList";

interface IBioDataViewProps {
    model: ITravellerHistoryModel;
    bioDataColumns?: any;
}


@observer
class BioDataHistory extends React.Component<IBioDataViewProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.BIODATADETAILS/>}
                           label="Bio Data History"
                           className="bio-data"
                           columns={this.props.bioDataColumns}
                           items={this.props.model.bioDataItems}
                           sync={this.props.model.sync}/>
        );
    }
}
export {BioDataHistory as default, BioDataHistory}
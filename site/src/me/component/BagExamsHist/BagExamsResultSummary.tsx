import * as React from 'react';
import { observer } from "mobx-react";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import * as Icons from "icon/AnalystDesktopIcons";
import "./BagExamsResultDetailsList.scss";
import MEDetailsList from "me/component/MEDetailsList";

interface MEBagExamsResultSummaryProps {
    model: ITravellerHistoryModel;
    bagsExamDataColumns?: any;
}


@observer
class BagExamsResultSummary extends React.Component<MEBagExamsResultSummaryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.BAGSEXAMS/>}
                           label="Exams History"
                           className="bags-exams"
                           columns={this.props.bagsExamDataColumns}
                           items={this.props.model.bagsExamResults}
                           sync={this.props.model.sync} />
        );
    }
}

export { BagExamsResultSummary as default, BagExamsResultSummary }
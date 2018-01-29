import * as React from "react";
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import IMESummaryModel from "../../summary/IMESummaryModel";
import otherCommentColumns from "./OtherCommentColumns";
import "./OtherComment.scss";
import MEDetailsList from "me/component/MEDetailsList";

interface SKSummaryProps {
    model: IMESummaryModel;
}


@observer
class MEOtherComment extends React.Component<SKSummaryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.ACTIVEITINERARY/>}
                           label="SK - Other Comments"
                            className="other-comment"
                            columns={otherCommentColumns}
                            items={this.props.model.otherCommentInfo}
                            sync={this.props.model.sync} />
        );

    }
}

export { MEOtherComment as default, MEOtherComment }
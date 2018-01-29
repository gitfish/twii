import * as React from "react";
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import IProfileMatchModel from "me/profilematch/IProfileMatchModel";
import "./ProfileMatchesDetailsList.scss";
import MEDetailsList from "../MEDetailsList";

interface IProfileMatchesListProps {
    model: IProfileMatchModel;
    profileColumns?: any;
    showHistoricalProfiles?: boolean;
    showCurrentProfiles?: boolean;
}

@observer
class ProfileMatchesDetails extends React.Component<IProfileMatchesListProps, any> {
    render() {
        let content;
        if(this.props.showHistoricalProfiles && this.props.showCurrentProfiles) {
            content=<div>
                <MEDetailsList icon={<Icons.PROFILEMATCH/>}
                               label="Current Profile Matches"
                               className="current-profile-matches-third-tab"
                               columns={this.props.profileColumns}
                               items={this.props.model.currentProfileMatches}
                               sync={this.props.model.sync}/>
                <MEDetailsList icon={<Icons.PROFILEMATCH/>}
                               label="Historical Profile Matches"
                               className="historical-profile-matches"
                               columns={this.props.profileColumns}
                               items={this.props.model.historicalProfileMatches}
                               sync={this.props.model.sync}/>
            </div>
        } else if(this.props.showHistoricalProfiles) {
            content = <MEDetailsList icon={<Icons.PROFILEMATCH/>}
                                       label="Historical Profile Matches"
                                       className="historial-profile-matches"
                                       columns={this.props.profileColumns}
                                       items={this.props.model.historicalProfileMatches}
                                       sync={this.props.model.sync}/>
        } else if(this.props.showCurrentProfiles) {
           content=  <MEDetailsList icon={<Icons.PROFILEMATCH/>}
                           label="Current Profile Matches"
                           className="current-profile-matches-first-tab"
                           columns={this.props.profileColumns}
                           items={this.props.model.currentProfileMatches}
                           sync={this.props.model.sync}/>
        }

        return (
            content
        );
    }
}

export { ProfileMatchesDetails as default, ProfileMatchesDetails }
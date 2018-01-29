import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import Details from "common/component/Details";

class EntityMatchesContainer extends React.Component<any, any> {
    render() {
        return (
            <Details title="Entity Matches" controlOnHeaderClick={false} open={true}>
                <MessageBar messageBarType={MessageBarType.warning}>No entity matches found</MessageBar>
            </Details>
        )
    }
}

export { EntityMatchesContainer }
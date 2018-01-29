import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Overlay } from "office-ui-fabric-react/lib/Overlay";
import Error from "common/component/Error";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import ISearchCoreModel from "../ISearchCoreModel";
import SearchCoreCommandBar from "./SearchCoreCommandBar";
import "./SearchCoreContainer.scss";

interface ISearchCoreContainerProps {
    core: ISearchCoreModel;
    onRender?: (core : ISearchCoreModel) => React.ReactNode;
}

const defaultCoreRenderer = (core : ISearchCoreModel) => {
    return <pre>{JSON.stringify(core.items, null, "\t")}</pre>;
};

@observer
class SearchCoreContainer extends React.Component<ISearchCoreContainerProps, any> {
    render() {
        let body;
        let overlay;
        let commandBar;
        if(this.props.core.sync.syncing) {
            const spinner = <Spinner className="search-spinner" label="Searching..." />;
            if(this.props.core.sync.hasSynced) {
                overlay = <Overlay className="search-overlay">{spinner}</Overlay>;
            } else {
                body = spinner;
            }
        }

        if(this.props.core.sync.error) {
            body = <Error error={this.props.core.sync.error} />;
        } else if(this.props.core.sync.hasSynced) {
            if(this.props.core.total > 0) {
                body = (
                    <div className="search-core-body">
                        {(this.props.onRender || defaultCoreRenderer)(this.props.core)}
                    </div>
                );
                commandBar = <SearchCoreCommandBar result={this.props.core} />;
            } else {
                body = <MessageBar className="search-core-message" messageBarType={MessageBarType.warning}>There are no results matching the specified search</MessageBar>;
            }
        } else if(!this.props.core.sync.syncing) {
            body = <MessageBar className="search-core-message" messageBarType={MessageBarType.warning}>You'll have to perform a search to see anything here</MessageBar>;
        }
        
        return (
            <div className="search-core">
                {overlay}
                {commandBar}
                {body}
            </div>
        );
    }
}

export { SearchCoreContainer as default, SearchCoreContainer, ISearchCoreContainerProps }
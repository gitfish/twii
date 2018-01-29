import * as React from "react";
import { observer } from "mobx-react";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import ISearchModel from "../ISearchModel";
import SearchComponentFactory from "./SearchComponentFactory";

interface ISearchCoresProps {
    search: ISearchModel;
}

@observer
class SearchCores extends React.Component<ISearchCoresProps, any> {
    render() {
        let content;
        if(!this.props.search.request) {
            content = <MessageBar className="search-result-message" messageBarType={MessageBarType.warning}>You'll have to perform a search to see anything here</MessageBar>;
        } else {
            const items = this.props.search.cores.map(core => {
                return (
                    <PivotItem key={core.id} linkText={core.name}>
                        {SearchComponentFactory(core)}
                    </PivotItem>
                );
            });
            content = <Pivot>{items}</Pivot>;
        }
        return (
            <div className="search-cores">
                {content}
            </div>
        );
    }
}

export { SearchCores as default, SearchCores }
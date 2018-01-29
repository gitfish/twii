import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import IMasterEntitySearchResultItem from "../IMasterEntitySearchResultItem";
import { byCode, entries } from "entity/MasterEntitySourceConfig";


interface IMasterEntitySourceSummaryProps {
    masterEntity: IMasterEntitySearchResultItem;
}

interface IMasterEntitySourceSummaryItemProps extends IMasterEntitySourceSummaryProps {
    sourceSystemCode: string;
    count: number;
}

class MasterEntitySourceSystemSummaryItem extends React.Component<IMasterEntitySourceSummaryItemProps, any> {
    render() {
        const configEntry = byCode(this.props.sourceSystemCode);
        return (
            <div className="master-entity-source-summary-item" aria-label={this.props.sourceSystemCode + ": " + this.props.count} title={this.props.sourceSystemCode + ": " + this.props.count}>
                {configEntry ? configEntry.icon() : this.props.sourceSystemCode}
            </div>
        );
    }
}

class MasterEntitySourceSummary extends React.Component<IMasterEntitySourceSummaryProps, any> {
    render() {
        const items : any[] = [];
        entries.forEach(e => {
            const count = this.props.masterEntity[e.key];
            if(!isNaN(count) && count > 0) {
                items.push(
                    <MasterEntitySourceSystemSummaryItem key={e.key} masterEntity={this.props.masterEntity} sourceSystemCode={e.key} count={count} />
                );
            }
        });
        if(items.length > 0) {
            return <div className="master-entity-source-summary">{items}</div>;
        }
        return <div>None available</div>;
    }
}

export { MasterEntitySourceSummary as default, MasterEntitySourceSummary, IMasterEntitySourceSummaryProps }
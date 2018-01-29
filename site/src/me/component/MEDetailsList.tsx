import * as React from "react";
import { observer } from "mobx-react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IViewPreferencesModel from "common/IViewPreferencesModel";
import ISyncModel from "common/ISyncModel";
import Error from "common/component/Error";
import Details from "common/component/Details";
import "./MEDetailsList.scss";
import {
    DetailsList,
    DetailsListLayoutMode,
    CheckboxVisibility,
    DetailsRow,
    SelectionMode,
    IDetailsRowProps,
} from "office-ui-fabric-react/lib/DetailsList";

interface MEDetailsListProps {
    icon: JSX.Element;
    label: string;
    className: string;
    columns: IColumn[];
    sync: ISyncModel;
    items: any[];
    prefsModel?: IViewPreferencesModel;
}

@observer
class MEDetailsList extends React.Component<MEDetailsListProps, any> {
    private _onShouldVirtualize = () => {
        return false;
    }
    private _onRenderRow = (props : IDetailsRowProps) => {
        const row = <DetailsRow {...props} />;
        return <div className={css("me-section-rows")}>{row}</div>;
    };
    render() {
        let content = <MessageBar messageBarType={MessageBarType.info}>No data available to display</MessageBar>;
        if(this.props.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.sync.error) {
            content = <Error error={this.props.sync.error} />
        } else if(this.props.sync.hasSynced) {
            if(this.props.items.length > 0) {
                content = <DetailsList columns={this.props.columns}
                                       compact={true}
                                       checkboxVisibility={CheckboxVisibility.hidden}
                                       items={this.props.items}
                                       layoutMode={DetailsListLayoutMode.justified}
                                       skipViewportMeasures={false}
                                       selectionMode={SelectionMode.none}
                                       onRenderRow={this._onRenderRow}
                                       onShouldVirtualize={this._onShouldVirtualize}/>
            }
        }
        return (
            <Details className={css(this.props.className, "me-section")}
                     summary={<div>{this.props.icon} {this.props.label}</div>}
                     open={true}
                     controlOnHeaderClick={true}
                     headerClassName={css(`${this.props.className}-ribbon`)}>
                     {content}
            </Details>
        );
    }
}

export { MEDetailsList as default, MEDetailsList }
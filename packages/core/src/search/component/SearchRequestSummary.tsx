import * as React from "react";
import { isNotBlank } from "../../StringUtils";
import { DefinitionList } from "../../component/DefinitionList";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { ISearchField } from "../ISearchField";
import { ISearchRequest } from "../ISearchRequest";
import { getStyles, ISearchRequestSummaryStyles } from "./SearchRequestSummary.styles";
import { getClassNames } from "./SearchRequestSummary.classNames";
import { ISearchGroup } from "../ISearchGroup";
import { ISearchSchema } from "../ISearchSchema";
import { getSchemaField } from "../SearchHelper";

interface ISearchRequestSummaryProps {
    request: ISearchRequest;
    schema?: ISearchSchema;
    styles?: ISearchRequestSummaryStyles;
    className?: string;
    hideOperator?: boolean;
}

interface ISearchFieldSummaryProps {
    field: ISearchField;
    schema?: ISearchSchema;
    styles?: ISearchRequestSummaryStyles;
    className?: string;
}

class SearchFieldSummary extends React.Component<ISearchFieldSummaryProps, any> {
    render() {
        const { field, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, styles), className);
        const schemaField = getSchemaField(this.props.schema, field.name);
        return <DefinitionList className={classNames.value} name={schemaField ? schemaField.name : field.name}>{field.searchString}</DefinitionList>;
    }
}

interface ISearchGroupSummaryProps {
    group: ISearchGroup;
    child?: boolean;
    schema?: ISearchSchema;
    styles?: ISearchRequestSummaryStyles;
    className?: string;
}

class SearchGroupSummary extends React.Component<ISearchGroupSummaryProps, any> {
    render() {
        const { group, schema, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const views =[];
        if(group.fields) {
            group.fields.forEach((field, index) => {
                if(index > 0) {
                    views.push(
                        <div key={`fieldop${index}`} className={classNames.op}>
                            {group.op || SearchGroupOperator.AND}
                        </div>
                    );
                }
                views.push(
                    <SearchFieldSummary key={`field${index}`} field={field} schema={schema} styles={styles} className={className} />
                );
            });
        }
        if(group.groups) {
            if(views.length > 0) {
                views.push(
                    <div key={`fieldtogroupop${views.length}`} className={classNames.op}>
                        {group.op || SearchGroupOperator.AND}
                    </div>
                );
            }
            group.groups.forEach((cg, index) => {
                if(index > 0) {
                    views.push(
                        <div key={`groupop${index}`} className={classNames.op}>
                            {group.op || SearchGroupOperator.AND}
                        </div>
                    );
                }
                views.push(<SearchGroupSummary key={`group${index}`} group={cg} schema={schema} styles={styles} className={className} child={true} />);
            });
        }
        if(views.length > 0) {
            return (
                <div className={classNames.group}>
                    {this.props.child ? "(" : ""}{views}{this.props.child ? ")" : ""}
                </div>
            );
        }
        return null;
    }
}

class SearchRequestSummary extends React.Component<ISearchRequestSummaryProps, any> {
    render() {
        const { request, schema, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                {isNotBlank(request.searchString) &&
                    <div className={classNames.value}>{request.searchString}</div>
                }
                <SearchGroupSummary {...this.props} group={request} />
            </div>
        );
    }
}

export { ISearchRequestSummaryProps, SearchRequestSummary }
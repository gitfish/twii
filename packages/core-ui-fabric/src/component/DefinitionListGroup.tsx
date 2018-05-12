import * as React from "react";
import { css } from "@uifabric/utilities/lib/css";
import { DefinitionList } from "./DefinitionList";
import { getStyles, IDefinitionListGroupStyles } from "./DefinitionListGroup.styles";
import { getClassNames } from "./DefinitionListGroup.classNames";

// NOTE: this might move into a more generic schema type that can be used for various purposes (forms/display) etc
interface IFieldProps {
    key: string;
    name: string;
    fieldName?: string;
    onRender?: (item : any, idx : number, field : IFieldProps) => React.ReactNode;
}

interface IDefinitionListGroupProps {
    className?: string;
    value: any;
    fields?: IFieldProps[];
    styles?: IDefinitionListGroupStyles;
}

class DefinitionListGroup extends React.Component<IDefinitionListGroupProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const items = [];
        if(this.props.value) {
            const fields : IFieldProps[] = this.props.fields || (Object.keys(this.props.value) || []).map(key => {
                return {
                    key: key,
                    fieldName: key,
                    name: key
                };
            });
            fields.forEach(field => {
                let value;
                if(field.onRender) {
                    value = field.onRender(this.props.value, 0, field);
                } else {
                    const immediateValue = this.props.value[field.fieldName || field.key];
                    if(immediateValue !== undefined && immediateValue !== null) {
                        value = String(immediateValue);
                    }
                }
                if(value !== undefined) {
                    items.push(<DefinitionList className={classNames.list} key={field.key} name={field.name}>{value}</DefinitionList>);
                }
            });
        }

        if(items.length > 0) {
            return <div className={classNames.root}>{this.props.children}</div>;
        }
        return null;
    }
}

export { DefinitionListGroup, IDefinitionListGroupProps, IFieldProps }
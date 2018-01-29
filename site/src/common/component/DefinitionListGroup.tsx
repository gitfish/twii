import * as React from "react";
import { css } from "@uifabric/utilities/lib/css";
import DefinitionList from "./DefinitionList";
import { ClassNames } from "./DefinitionListGroup.style";

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
    inline?: boolean;
}

const createGroupItems = (props : IDefinitionListGroupProps) => {
    const items = [];
    if(props.value) {
        const fields : IFieldProps[] = props.fields || (Object.keys(props.value) || []).map(key => {
            return {
                key: key,
                fieldName: key,
                name: key
            };
        });
        fields.forEach(field => {
            let value;
            if(field.onRender) {
                value = field.onRender(props.value, 0, field);
            } else {
                const immediateValue = props.value[field.fieldName || field.key];
                if(immediateValue !== undefined && immediateValue !== null) {
                    value = String(immediateValue);
                }
            }
            if(value !== undefined) {
                items.push(<DefinitionList inline={props.inline} key={field.key} name={field.name}>{value}</DefinitionList>);
            }
        });
    }
    return items;
};

interface IDefinitionListGroupWrapperProps {
    className?: string;
}

class DefinitionListGroupWrapper extends React.Component<IDefinitionListGroupWrapperProps, any> {
    render() {
        return <div className={css("definition-list-group", ClassNames.root, this.props.className)}>{this.props.children}</div>
    }
}

class DefinitionListGroup extends React.Component<IDefinitionListGroupProps, any> {
    render() {
        const items = createGroupItems(this.props);
        return items.length > 0 ? <DefinitionListGroupWrapper className={this.props.className}>{items}</DefinitionListGroupWrapper> : null;
    }
}

export { DefinitionListGroup as default, DefinitionListGroup, DefinitionListGroupWrapper, IDefinitionListGroupProps, IFieldProps, createGroupItems }
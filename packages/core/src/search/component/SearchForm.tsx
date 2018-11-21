import * as React from "react";
import { ISearchFieldModel } from "../model/ISearchFieldModel";
import { observer } from "mobx-react";
import { ISearchFormStyles, getStyles } from "./SearchForm.styles";
import { getClassNames } from "./SearchForm.classNames";
import { IDropdownOption, Dropdown, DropdownMenuItemType } from "office-ui-fabric-react/lib/Dropdown";
import { BoundTextField } from "../../component/BoundTextField";
import { IconButton, PrimaryButton, DefaultButton, CommandBarButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { ISearchRequest } from "../ISearchRequest";
import { ISearchRequestProps } from "./ISearchRequestProps";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { KeyCodes } from "@uifabric/utilities";
import { BoundSearchBox } from "../../component/BoundSearchBox";
import { ISearchGroupModel } from "../model/ISearchGroupModel";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { getSchemaField } from "../SearchHelper";
import { SearchSchemaFieldType } from "../ISearchSchema";
import { ISearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { ITextField, TextField } from "office-ui-fabric-react/lib/TextField";
import { SearchOperator } from "../SearchOperator";
import MomentField, { IMomentField } from "../../component/MomentField";
import * as moment from "moment";
import { momentToSearchString, momentFromSearchString, momentRangeFromSearchString, momentRangeToSearchString } from "../SearchDateUtils";
import { numberFromSearchString, numberRangeFromSearchString, numberRangeToSearchString } from "../SearchNumberUtils";
import { ComboBox, IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";

interface IFocusable {
    focus() : void;
}

interface ISearchForm extends IFocusable {

}

interface ISearchFormProps extends ISearchRequestProps {
    styles?: ISearchFormStyles;
    className?: string;
    onSubmit?: (request : ISearchRequest) => void;
    hideOperator?: boolean;
    hideTextExpand?: boolean;
    textPlaceholder?: string;
    onRenderPrefix?: (props : ISearchFormProps) => React.ReactNode;
    onRenderSuffix?: (props : ISearchFormProps) => React.ReactNode;
}

interface ISearchGroupProps {
    group: ISearchGroupModel;
    styles?: ISearchFormStyles;
    className?: string;
}

interface ISearchGroupFieldProps extends ISearchGroupProps {
    field: ISearchFieldModel;
}

@observer
class SearchGroupFieldSelector extends React.Component<ISearchGroupFieldProps, any> {
    private _onChange = (ev, option : IComboBoxOption) => {
        this.props.field.setName(String(option.key));
    }
    render() {
        const options : IComboBoxOption[] = [];
        options.push({
            key: "",
            text: "All Fields"
        });
        this.props.group.schema.fields.forEach(s => {
            if(!s.hidden) {
                if(s.type && s.type === SearchSchemaFieldType.divider) {
                    options.push({
                        key: s.key,
                        itemType: DropdownMenuItemType.Divider,
                        text: "-"
                    });
                } else {
                    options.push({
                        key: s.key,
                        text: s.name || s.key
                    });
                }
            }
        });
        const fieldName = this.props.field.name;
        const schemaField = getSchemaField(this.props.group.schema, fieldName);
        const selectedKey = schemaField ? schemaField.key : "";
        return <ComboBox options={options} onChange={this._onChange} selectedKey={selectedKey} />;
    }
}

@observer
class SearchGroupDateOperatorSelector extends React.Component<ISearchGroupFieldProps, any> {
    private _onChange = (ev, option : IComboBoxOption) => {
        const currentOperator = this.props.field.operator;
        this.props.field.setOperator(option.data);
        if(currentOperator === SearchOperator.between) {
            const range = momentRangeFromSearchString(this.props.field.searchString);
            if(range && range.from) {
                this.props.field.setSearchString(momentToSearchString(range.from));
            } else if(range && range.to) {
                this.props.field.setSearchString(momentToSearchString(range.to));
            }
        }
    }
    render() {
        const options : IComboBoxOption[] = [
            {
                key: SearchOperator.equals,
                text: "equals",
                data: SearchOperator.equals
            },
            {
                key: SearchOperator.between,
                text: "is between",
                data: SearchOperator.between
            }
        ];
        const selectedKey = this.props.field.operator || SearchOperator.equals;
        return <ComboBox options={options} onChange={this._onChange} selectedKey={selectedKey} />;
    }
}

@observer
class SearchGroupNumberValueEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _componentRef : ITextField;
    private _onComponentRef = (ref : ITextField) => {
        this._componentRef = ref;
    }
    focus() {
        if(this._componentRef) {
            this._componentRef.focus();
        }
    }
    render() {
        return <BoundTextField binding={{ target: this.props.field, key: "searchString" }}
                                componentRef={this._onComponentRef} />;
    }
}

@observer
class SearchGroupNumberRangeEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _fromRef : ITextField;
    private _toRef : ITextField;
    private _onFromRef = (ref : ITextField) => {
        this._fromRef = ref;
    }
    private _onToRef = (ref : ITextField) => {
        this._toRef = ref;
    }
    focus() {
        if(this._fromRef) {
            this._fromRef.focus();
        }
    }
    private _onFromChange = (e, value : string) => {
        const range = numberRangeFromSearchString(this.props.field.searchString);
        range.from = numberFromSearchString(value);
        this.props.field.setSearchString(numberRangeToSearchString(range));
    }
    private _onToChange = (e, value : string) => {
        const range = numberRangeFromSearchString(this.props.field.searchString);
        range.to = numberFromSearchString(value);
        this.props.field.setSearchString(numberRangeToSearchString(range));
    }
    render() {
        const range = numberRangeFromSearchString(this.props.field.searchString);
        const from = range.from !== undefined ? String(range.from) : "";
        const to = range.to !== undefined ? String(range.to) : "";
        return (
            <div style={{ display: "flex", alignItems: "center"}}>
                <div style={{ width: "50%", marginRight: 4 }}>
                    <TextField placeholder="Enter a number..." value={from} onChange={this._onFromChange} componentRef={this._onFromRef} />
                </div>
                <div style={{ width: "50%", marginLeft: 4 }}>
                    <TextField placeholder="Enter a number..." value={to} onChange={this._onToChange} componentRef={this._onToRef} />
                </div>
            </div>
        )
    }
}

@observer
class SearchGroupNumberEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _valueEditorRef : SearchGroupNumberValueEditor;
    private _rangeEditorRef : SearchGroupNumberRangeEditor;
    private _onValueEditorRef = (ref : SearchGroupNumberValueEditor) => {
        this._valueEditorRef = ref;
    }
    private _onRangeValueEditorRef = (ref : SearchGroupNumberRangeEditor) => {
        this._rangeEditorRef = ref;
    }
    focus() {
        if(this._valueEditorRef) {
            this._valueEditorRef.focus();
        } else if(this._rangeEditorRef) {
            this._rangeEditorRef.focus();
        }
    }
    render() {
        const { field } = this.props;
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <SearchGroupDateOperatorSelector {...this.props} />
                </div>
                <div style={{ marginLeft: 8, flexGrow: 1 }}>
                    {!field.operator || field.operator === SearchOperator.equals ? <SearchGroupNumberValueEditor {...this.props} ref={this._onValueEditorRef} /> : undefined}
                    {field.operator === SearchOperator.between ? <SearchGroupNumberRangeEditor {...this.props} ref={this._onRangeValueEditorRef} /> : undefined}
                </div>
            </div>
        );
    }
}

@observer
class SearchGroupDateValueEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _componentRef : IMomentField;
    private _onComponentRef = (ref : IMomentField) => {
        this._componentRef = ref;
    }
    focus() {
        if(this._componentRef) {
            this._componentRef.focus();
        }
    }
    private _onChange = (value : moment.Moment) => {
        this.props.field.setSearchString(momentToSearchString(value));
    }
    render() {
        return (
            <MomentField placeholder="DD/MM/YYYY"
                        onChange={this._onChange}
                        value={momentFromSearchString(this.props.field.searchString)}
                        ref={this._onComponentRef} />
        );
    }
}

// this is an impressively shitty implementation, but going with it for now
@observer
class SearchGroupDateRangeEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _fromRef : IMomentField;
    private _toRef : IMomentField;
    private _onFromRef = (ref : IMomentField) => {
        this._fromRef = ref;
    }
    private _onToRef = (ref : IMomentField) => {
        this._toRef = ref;
    }
    focus() {
        if(this._fromRef) {
            this._fromRef.focus();
        }
    }
    private _onFromChange = (value : moment.Moment) => {
        const range = momentRangeFromSearchString(this.props.field.searchString);
        range.from = value;
        this.props.field.setSearchString(momentRangeToSearchString(range));
    }
    private _onToChange = (value : moment.Moment) => {
        const range = momentRangeFromSearchString(this.props.field.searchString);
        range.to = value;
        this.props.field.setSearchString(momentRangeToSearchString(range));
    }
    render() {
        const range = momentRangeFromSearchString(this.props.field.searchString);
        return (
            <div style={{ display: "flex", alignItems: "center"}}>
                <div style={{ width: "50%", marginRight: 4 }}>
                    <MomentField placeholder="DD/MM/YYYY" value={range.from} onChange={this._onFromChange} ref={this._onFromRef} />
                </div>
                <div style={{ width: "50%", marginLeft: 4 }}>
                    <MomentField placeholder="DD/MM/YYYY" value={range.to} onChange={this._onToChange} ref={this._onToRef} />
                </div>
            </div>
        )
    }
}

@observer
class SearchGroupDateEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _valueEditorRef : SearchGroupDateValueEditor;
    private _rangeEditorRef : SearchGroupDateRangeEditor;
    private _onValueEditorRef = (ref : SearchGroupDateValueEditor) => {
        this._valueEditorRef = ref;
    }
    private _onRangeValueEditorRef = (ref : SearchGroupDateRangeEditor) => {
        this._rangeEditorRef = ref;
    }
    focus() {
        if(this._valueEditorRef) {
            this._valueEditorRef.focus();
        } else if(this._rangeEditorRef) {
            this._rangeEditorRef.focus();
        }
    }
    render() {
        const { field } = this.props;
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <SearchGroupDateOperatorSelector {...this.props} />
                </div>
                <div style={{ marginLeft: 8, flexGrow: 1 }}>
                    {!field.operator || field.operator === SearchOperator.equals ? <SearchGroupDateValueEditor {...this.props} ref={this._onValueEditorRef} /> : undefined}
                    {field.operator === SearchOperator.between ? <SearchGroupDateRangeEditor {...this.props} ref={this._onRangeValueEditorRef} /> : undefined}
                </div>
            </div>
        );
    }
}

class SearchGroupStringValueEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _componentRef : ITextField;
    private _onComponentRef = (ref : ITextField) => {
        this._componentRef = ref;
    }
    focus() {
        if(this._componentRef) {
            this._componentRef.focus();
        }
    }
    render() {
        return <BoundTextField binding={{ target: this.props.field, key: "searchString" }} componentRef={this._onComponentRef} />;
    }
}

@observer
class SearchStringOperatorSelector extends React.Component<ISearchGroupFieldProps, any> {
    private _onChange = (ev, option : IComboBoxOption) => {
        this.props.field.setOperator(option.data);
    }
    render() {
        const options : IComboBoxOption[] = [
            {
                key: SearchOperator.matchesAllTerms,
                text: "contains all",
                data: SearchOperator.matchesAllTerms
            },
            {
                key: SearchOperator.matchesAnyTerm,
                text: "contains any",
                data: SearchOperator.matchesAnyTerm
            },
            {
                key: SearchOperator.matchesPhrase,
                text: "contains",
                data: SearchOperator.matchesPhrase
            },
            {
                key: SearchOperator.beginsWith,
                text: "begins with",
                data: SearchOperator.beginsWith
            },
            {
                key: SearchOperator.endsWith,
                text: "ends with",
                data: SearchOperator.endsWith
            }
        ];
        const selectedKey = this.props.field.operator || SearchOperator.matchesAllTerms;
        return <ComboBox options={options} onChange={this._onChange} selectedKey={selectedKey} />;
    }
}

class SearchGroupStringEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _valueEditorRef : SearchGroupStringValueEditor;
    private _onValueEditorRef = (ref : SearchGroupStringValueEditor) => {
        this._valueEditorRef = ref;
    }
    focus() {
        if(this._valueEditorRef) {
            this._valueEditorRef.focus();
        }
    }
    render(){
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <SearchStringOperatorSelector {...this.props} />
                </div>
                <div style={{ marginLeft: 8, flexGrow: 1 }}>
                    <SearchGroupStringValueEditor {...this.props} ref={this._onValueEditorRef} />
                </div>
            </div>
        );
    }
}

@observer
class SearchGroupValueEditor extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _dateEditorRef : IFocusable;
    private _stringEditorRef : IFocusable;
    private _onDateEditorRef = (ref : SearchGroupDateValueEditor) => {
        this._dateEditorRef;
    }
    private _onStringEditorRef = (ref : SearchGroupStringEditor) => {
        this._stringEditorRef = ref;
    }
    focus() {
        if(this._dateEditorRef) {
            this._dateEditorRef.focus();
        } else if(this._stringEditorRef) {
            this._stringEditorRef.focus();
        }
    }
    render() {
        const fieldName = this.props.field.name;
        const schemaField = getSchemaField(this.props.group.schema, fieldName);
        if(schemaField && schemaField.type === SearchSchemaFieldType.date) {
            return <SearchGroupDateEditor {...this.props} /> 
        } else if(schemaField && schemaField.type === SearchSchemaFieldType.number) {
            return <SearchGroupNumberEditor {...this.props} />
        }
        return <SearchGroupStringEditor {...this.props} ref={this._onStringEditorRef} />
    }
}

class SearchGroupFieldRemoveAction extends React.Component<ISearchGroupFieldProps, any> {
    private _onClick = () => {
        this.props.field.remove();
    }
    render() {
        return <IconButton onClick={this._onClick} iconProps={{ iconName: "Delete" }} title="Remove Field" ariaLabel="Remove Field" />
    }
}

class SearchGroupField extends React.Component<ISearchGroupFieldProps, any> implements IFocusable {
    private _valueEditorRef : SearchGroupValueEditor;
    private _onFieldRef = (ref : SearchGroupValueEditor) => {
        this._valueEditorRef = ref;
    }
    focus() {
        if(this._valueEditorRef) {
            this._valueEditorRef.focus();
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.fieldContainer}>
                <div className={classNames.fieldSelectContainer}>
                    <SearchGroupFieldSelector {...this.props} />
                </div>
                <div className={classNames.fieldValueContainer}>
                    <SearchGroupValueEditor {...this.props} ref={this._onFieldRef} />
                </div>
                <div className={classNames.fieldRemoveContainer}>
                    <SearchGroupFieldRemoveAction {...this.props} />
                </div>
            </div>
        );
    }
}

class SearchGroupFieldAddAction extends React.Component<ISearchGroupProps, any> {
    private _onClick = () => {
        this.props.group.addField();
    }
    render() {
        return <DefaultButton iconProps={{ iconName: "Add"}} onClick={this._onClick}>Add Rule</DefaultButton>;
    }
}

class SearchGroupGroupAddAction extends React.Component<ISearchGroupProps, any> {
    private _onClick = () => {
        this.props.group.addGroup();
    }
    render() {
        return <DefaultButton iconProps={{ iconName: "Add"}} onClick={this._onClick}>Add Group</DefaultButton>;
    }
}

class SearchGroupAddCommandBarButton extends React.Component<ISearchGroupProps, any> {
    private _onClickAddField = () => {
        this.props.group.addField();
    }
    private _onClickAddGroup = () => {
        this.props.group.addGroup();
    }
    render() {
        const items : IContextualMenuItem[] = [];
        items.push({
            key: "group",
            name: "Add Group",
            iconProps: {
                iconName: "Add"
            },
            onClick: this._onClickAddGroup
        });
        return (
            <CommandBarButton iconProps={{ iconName: "Add" }} menuProps={{ items: items }} split onClick={this._onClickAddField}>
                Add Rule
            </CommandBarButton>
        );
    }
}

const createSearchGroupAddMenuItem = (props : ISearchGroupProps) : IContextualMenuItem => {
    return {
        key: "searchGroupAdd",
        onRender(item) {
            return <SearchGroupAddCommandBarButton key={item.key} {...props} />;
        }
    };
};

@observer
class SearchRequestAddCommandBarButton extends React.Component<ISearchRequestProps, any> {
    render() {
        if(this.props.request.isComplex) {
            return <SearchGroupAddCommandBarButton group={this.props.request} />;
        }
        return null;
    }
};

const createSearchRequestAddMenuItem = (props : ISearchRequestProps) : IContextualMenuItem => {
    return {
        key: "searchRequestAdd",
        onRender(item) {
            return <SearchRequestAddCommandBarButton key={item.key} {...props} />;
        }
    };
};

@observer
class SearchGroupFields extends React.Component<ISearchGroupProps, any> implements IFocusable {
    private _firstFieldRef : SearchGroupField;
    private _onFirstFieldRef = (ref : SearchGroupField) => {
        this._firstFieldRef = ref;
    }
    focus() {
        if(this._firstFieldRef) {
            this._firstFieldRef.focus();
        }
    }
    render()  {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const fieldViews = this.props.group.fields.map((field, idx) => {
            return <SearchGroupField key={idx} {...this.props} field={field} ref={idx === 0 ? this._onFirstFieldRef : undefined} />
        });
        if(fieldViews.length > 0) {
            return (
                <div className={classNames.fieldsContainer}>
                    {fieldViews}
                </div>
            );
        }
        return null;
    }  
}

@observer
class SearchGroupChildGroups extends React.Component<ISearchGroupProps, any> implements IFocusable {
    private _firstGroupRef : SearchGroup;
    private _onFirstGroupRef = (ref : SearchGroup) => {
        this._firstGroupRef = ref;
    }
    focus() {
        if(this._firstGroupRef) {
            this._firstGroupRef.focus();
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const groupViews = this.props.group.groups.map((g, idx) => {
            return <SearchGroup key={idx} {...this.props} group={g} ref={idx === 0 ? this._onFirstGroupRef : undefined} />;
        });
        if(groupViews.length > 0) {
            return (
                <div className={classNames.fieldsContainer}>
                    {groupViews}
                </div>
            );
        }
        return null;
    }
}

@observer
class SearchGroupFieldActions extends React.Component<ISearchGroupProps, any> {
    render() {
        return (
            <div>
                <SearchGroupFieldAddAction {...this.props} />
                {this.props.group.groups.length === 0 && <SearchGroupGroupAddAction {...this.props} />}
            </div>
        );
    }
}

@observer
class SearchGroupGroupActions extends React.Component<ISearchGroupProps, any> {
    render() {
        if(this.props.group.groups.length > 0) {
            return <SearchGroupGroupAddAction {...this.props} />;
        }
        return null;
    }
}

@observer
class SearchGroupRemoveCommandBarButton extends React.Component<ISearchGroupProps, any> {
    private _onClick = () => {
        this.props.group.remove();
    }
    render() {
        if(this.props.group.parent) {
            return (
                <CommandBarButton onClick={this._onClick} iconProps={{ iconName: "Clear" }} title="Remove Group" ariaLabel="Remove Group" />
            );
        }
        return null;
    }
}

const createSearchGroupRemoveMenuItem = (props : ISearchGroupProps, key : string = "searchGroupRemove") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <SearchGroupRemoveCommandBarButton key={item.key} {...props} />;
        }
    }   
};

class SearchGroup extends React.Component<ISearchGroupProps, any> implements IFocusable {
    private _fieldsRef : SearchGroupFields;
    private _childGroupsRef : SearchGroupChildGroups;
    private _onFieldsRef = (ref : SearchGroupFields) => {
        this._fieldsRef = ref;
    }
    private _onChildGroupsRef = (ref : SearchGroupChildGroups) => {
        this._childGroupsRef = ref;
    }
    focus() {
        if(this.props.group.fieldCount > 0) {
            if(this._fieldsRef) {
                this._fieldsRef.focus();
            }
        } else if(this._childGroupsRef) {
            this._childGroupsRef.focus();
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const items : IContextualMenuItem[] = [];
        items.push(
            createSearchGroupAddMenuItem(this.props),
            createGroupOperatorMenuItem(this.props)
        );
        const farItems : IContextualMenuItem[] = [];
        farItems.push(
            createSearchGroupRemoveMenuItem(this.props)
        );
        return (
            <div className={this.props.group.parent ? classNames.childGroup : classNames.group}>
                <CommandBar items={items} farItems={farItems} />
                <div className={classNames.childGroupContent}>
                    <SearchGroupFields {...this.props} ref={this._onFieldsRef} />
                    <SearchGroupChildGroups {...this.props} ref={this._onChildGroupsRef} />
                </div>
            </div>
        );
    }  
}

@observer
class SearchFormSubmitButton extends React.Component<ISearchFormProps, any> {
    private _onClick = () => {
        if(this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    render() {
        if(this.props.onSubmit) {
            const disabled = !this.props.request.isSpecified;
            return <PrimaryButton iconProps={{ iconName: "Search"}} onClick={this._onClick} disabled={disabled}>Search</PrimaryButton>
        }
        return null;
    }
}

@observer
class SearchFormClearButton extends React.Component<ISearchFormProps, any> {
    private _onClick = () => {
        this.props.request.clear();
    }
    render() {
        if(this.props.onSubmit) {
            const disabled = !this.props.request.isSpecified;
            return <DefaultButton iconProps={{ iconName: "Clear"}} onClick={this._onClick} disabled={disabled}>Clear</DefaultButton>
        }
        return null;
    }
}

class SearchFormActions extends React.Component<ISearchFormProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.searchActions}>
                <SearchFormSubmitButton {...this.props} />
                <SearchFormClearButton {...this.props} />
            </div>
        );
    }
}

class SearchFormTextSearch extends React.Component<ISearchFormProps, any> implements IFocusable {
    private _componentRef : ISearchBox;
    private _onComponentRef = (ref : ISearchBox) => {
        this._componentRef = ref;
    }
    private _onSearch = () => {
        if(this.props.onSubmit && this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    focus() {
        if(this._componentRef) {
            this._componentRef.focus();
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <BoundSearchBox className={classNames.textSearch}
                            binding={{ target: this.props.request, key: "searchString" }}
                            placeholder={this.props.textPlaceholder || "Search"} onSearch={this._onSearch}
                            componentRef={this._onComponentRef}
                            disableAnimation />
        );
    }
}

@observer
class SearchModeSelectCommandBarButton extends React.Component<ISearchRequestProps, any> {
    private _onClick = (ev, item) => {
        this.props.request.setComplex(item.complex);
    }
    render() {
        const items : IContextualMenuItem[] = [];
        items.push({
            key: "text",
            name: "Text",
            title: "Search using a single text field",
            iconProps: { iconName: "TextField" },
            canCheck: true,
            checked: !this.props.request.isComplex,
            complex: false,
            onClick: this._onClick
        });
        items.push({
            key: "query",
            name: "Query Builder",
            title: "Search using the query builder",
            iconProps: { iconName: "QueryList" },
            canCheck: true,
            checked: this.props.request.isComplex,
            complex: true,
            onClick: this._onClick
        });
        const current = items.find(item => item.checked);
        return (
            <CommandBarButton menuProps={{ items: items }}
                              iconProps={current.iconProps}
                              title={current.title}>
                {current.name}
            </CommandBarButton>
        );
    }
}

const createSearchModeSelectMenuItem = (props : ISearchRequestProps) : IContextualMenuItem => {
    return {
        key: "searchModeToggle",
        onRender: (item) => {
            return <SearchModeSelectCommandBarButton key={item.key} {...props} />;
        }
    };
};

interface ISearchGroupButtonProps extends ISearchGroupProps {
    buttonProps?: IButtonProps;
}

@observer
class GroupOperatorCommandBarButton extends React.Component<ISearchGroupButtonProps, any> {
    private _onClickItem = (e, item) => {
        this.props.group.setOp(item.key);
    }
    render() {
        const { group } = this.props;
        const operator = group.op;
        const items : IContextualMenuItem[] = [
            {
                key: SearchGroupOperator.AND,
                name: SearchGroupOperator.AND,
                value: SearchGroupOperator.AND,
                title: `Apply ${SearchGroupOperator.AND} Operator: results will match all of the specified terms/phrases`,
                ariaLabel: `Apply ${SearchGroupOperator.AND} Operator: results will match all of the specified terms/phrases`,
                onClick: this._onClickItem,
                canCheck: true,
                checked: operator === SearchGroupOperator.AND
            },
            {
                key: SearchGroupOperator.OR,
                name: SearchGroupOperator.OR,
                onClick: this._onClickItem,
                title: `Apply ${SearchGroupOperator.OR} Operator: results will match any of the specified terms/phrases`,
                ariaLabel: `Apply ${SearchGroupOperator.OR} Operator: results will match any of the specified terms/phrases`,
                canCheck: true,
                checked: operator === SearchGroupOperator.OR
            }
        ];
        const current = items.find(item => item.checked);
        return (
            <CommandBarButton menuProps={{ items: items }} title={current.title}>
                {current.name
            }</CommandBarButton>
        );
    }
}

const createGroupOperatorMenuItem = (props : ISearchGroupButtonProps) : IContextualMenuItem => {
    return {
        key: "searchGroupOperator",
        onRender(item) {
            return <GroupOperatorCommandBarButton key={item.key} {...props} />;
        }
    };
};

interface ISearchRequestButtonProps extends ISearchRequestProps {
    buttonProps?: IButtonProps;
}

@observer
class SearchRequestOperatorCommandBarButton extends React.Component<ISearchRequestButtonProps, any> {
    render() {
        if(!this.props.request.isComplex) {
            return <GroupOperatorCommandBarButton {...this.props} group={this.props.request} />
        }
        return null;
    }
}

const createSearchRequestOperatorMenuItem = (props : ISearchRequestButtonProps) : IContextualMenuItem => {
    return {
        key: "searchRequestOperator",
        onRender(item) {
            return <SearchRequestOperatorCommandBarButton key={item.key} {...props} />
        }
    };
};

class SearchFormTextSearchContainer extends React.Component<ISearchFormProps, any> implements IFocusable {
    private _textSearchRef : SearchFormTextSearch;
    private _onTextSearchRef = (ref : SearchFormTextSearch) => {
        this._textSearchRef = ref;
    }
    focus() {
        if(this._textSearchRef) {
            this._textSearchRef.focus();
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.textSearchContainer}>
                <SearchFormTextSearch {...this.props} ref={this._onTextSearchRef} />
            </div>
        );
    }
}

@observer
class SearchFormOperator extends React.Component<ISearchFormProps, any> {
    private _onChanged = (ev, option : IDropdownOption) => {
        this.props.request.setOp(option.key as SearchGroupOperator);
    }
    render() {
        if(this.props.request.isComplex && !this.props.hideOperator) {
            const op = this.props.request.op;
            const options : IDropdownOption[] = [
                {
                    key: SearchGroupOperator.AND,
                    text: "AND - results will match all of the specified terms/phrases"
                },
                {
                    key: SearchGroupOperator.OR,
                    text: "OR - results will match any of the specified terms/phrases"
                }
            ];
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.inputContainer}>
                    <Dropdown options={options} selectedKey={op} onChange={this._onChanged} label="Operator" />
                </div>
            );
        }
        return null;
    }
}

class SearchFormExpandedContainer extends React.Component<ISearchFormProps, any> implements IFocusable {
    private _searchGroupRef : SearchGroup;
    private _onSearchGroupRef = (ref : SearchGroup) => {
        this._searchGroupRef = ref;
    }
    focus() {
        if(this._searchGroupRef) {
            this._searchGroupRef.focus();
        }
    }
    render() {
        return (
            <div>
                <SearchGroup {...this.props} group={this.props.request} ref={this._onSearchGroupRef} />
            </div>
        );
    }
}

@observer
class SearchForm extends React.Component<ISearchFormProps, any> implements ISearchForm {
    private _textRef : SearchFormTextSearchContainer;
    private _expandedRef : SearchFormExpandedContainer;
    private _onTextRef = (ref : SearchFormTextSearchContainer) => {
        this._textRef = ref;
    }
    private _onExpandedRef = (ref : SearchFormExpandedContainer) => {
        this._expandedRef = ref;
    }
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter && this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    focus() {
        if(this.props.request.isComplex) {
            if(this._expandedRef) {
                this._expandedRef.focus();
            }
        } else {
            if(this._textRef) {
                this._textRef.focus();
            }
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root} onKeyDown={this._onKeyDown}>
                <div className={classNames.formInput}>
                    {this.props.onRenderPrefix && (
                        <div className={classNames.prefix}>
                            {this.props.onRenderPrefix(this.props)}
                        </div>
                    )}
                    <div className={classNames.content}>
                        {!this.props.request.isComplex && <SearchFormTextSearchContainer {...this.props} ref={this._onTextRef} />}
                        {this.props.request.isComplex && <SearchFormExpandedContainer {...this.props} ref={this._onExpandedRef} />}
                    </div>
                    {this.props.onRenderSuffix && (
                        <div className={classNames.suffix}>
                            {this.props.onRenderSuffix(this.props)}
                        </div>
                    )}
                </div>
                <SearchFormActions {...this.props} />
            </div>
        );
    }
}

export {
    IFocusable,
    ISearchFormProps,
    ISearchGroupProps,
    ISearchGroupFieldProps,
    SearchGroupFields,
    SearchGroupField,
    SearchFormTextSearch,
    SearchFormTextSearchContainer,
    SearchFormOperator,
    SearchFormActions,
    SearchForm,
    SearchModeSelectCommandBarButton,
    createSearchModeSelectMenuItem,
    GroupOperatorCommandBarButton,
    createGroupOperatorMenuItem,
    SearchGroupAddCommandBarButton,
    createSearchGroupAddMenuItem,
    SearchRequestAddCommandBarButton,
    createSearchRequestAddMenuItem,
    SearchRequestOperatorCommandBarButton,
    createSearchRequestOperatorMenuItem
}
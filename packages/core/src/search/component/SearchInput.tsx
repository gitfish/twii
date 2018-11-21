import * as React from "react";
import { ISearchRequestProps } from "./ISearchRequestProps";
import { getClassNames } from "./SearchInput.classNames";
import { getStyles, ISearchInputStyles } from "./SearchInput.styles";
import { observer } from "mobx-react";
import { IconButton, IButtonProps, CommandBarButton } from "office-ui-fabric-react/lib/Button";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Callout } from "office-ui-fabric-react/lib/Callout";
import { ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import { BoundTextField } from "../../component/BoundTextField";
import { ISearchSchema } from "../ISearchSchema";
import { KeyCodes } from "@uifabric/utilities";
import { SearchForm } from "./SearchForm";

interface ISearchRequestButtonProps extends ISearchRequestProps {
    buttonProps?: IButtonProps;
}

@observer
class SearchGroupOperatorCommandBarButton extends React.Component<ISearchRequestButtonProps, any> {
    private _onClickItem = (e, item) => {
        this.props.request.setOp(item.key);
        if(this.props.request.isSpecified && this.props.onSubmit) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    render() {
        const { request } = this.props;
        const operator = request.op || SearchGroupOperator.AND;
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
            <CommandBarButton styles={{ root: { height: "100%" }}} menuProps={{ items: items }} title={current.title}>{operator}</CommandBarButton>
        );
    }
}

const createSearchGroupOperatorMenuItem = (props : ISearchRequestButtonProps) : IContextualMenuItem => {
    return {
        key: "searchGroupOperator",
        onRender: (item) => {
            return <SearchGroupOperatorCommandBarButton key={item.key} {...props} />;
        }
    };
};

interface ISearchInputContainerProps extends ISearchRequestProps {
    styles?: ISearchInputStyles;
    className?: string;
    textFieldProps?: ITextFieldProps;
    schema?: ISearchSchema;
    onRenderForm?: (props : ISearchInputContainerProps) => React.ReactNode;
}

@observer
class SearchExpandButton extends React.Component<ISearchRequestProps, any> {
    private _onClick = () => {
        this.props.request.setComplex(!this.props.request.isComplex);
    }
    render() {
        const { request } = this.props;
        const iconTitle = request.isComplex ? "Hide Extended Search" : "Show Extended Search";
        return (
            <IconButton onClick={this._onClick}
                        iconProps={{ iconName: request.isComplex ? "ChevronUp" : "ChevronDown" }}
                        title={iconTitle}
                        ariaLabel={iconTitle}
                        styles={{ root: { height: "100%" }}} />
        );
    }
}

@observer
class SearchExpandContainer extends React.Component<ISearchInputContainerProps, any> {
    private _calloutTargetRef : HTMLDivElement;
    private _onCalloutTargetRef = (ref : HTMLDivElement) => {
        this._calloutTargetRef = ref;
    }
    private _onCalloutDismiss = () => {
        this.props.request.setComplex(false);
    }
    private _onRenderForm = () => {
        if(this.props.onRenderForm) {
            return this.props.onRenderForm(this.props);
        }
        return <SearchForm  request={this.props.request} onSubmit={this.props.onSubmit} />;
    }
    render() {
        const { request, schema, onRenderForm } = this.props;
        if(schema || onRenderForm) {
            return (
                <div ref={this._onCalloutTargetRef} style={{ height: "100%" }}>
                    <SearchExpandButton {...this.props} />
                    {request.isComplex && (
                        <Callout onDismiss={this._onCalloutDismiss}
                                target={this._calloutTargetRef}>
                            {this._onRenderForm()}
                        </Callout>
                    )}
                </div>
            );
        }
        return null;
    }
}

class SearchInputContainer extends React.Component<ISearchInputContainerProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter && this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        } else if(e.which === KeyCodes.escape) {
            this.props.request.setSearchString(undefined);
        }
    }
    private _onRenderPrefix = () => {
        return <SearchExpandContainer {...this.props} />;
    }
    private _onRenderSuffix = () => {
        return <SearchGroupOperatorCommandBarButton {...this.props} />;
    }
    render() {
        const disabled = !this.props.onSubmit;
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <BoundTextField className={classNames.root}
                            disabled={disabled}
                            binding={{ target: this.props.request, key: "searchString" }}
                            onKeyDown={this._onKeyDown}
                            onRenderPrefix={this.props.schema || this.props.onRenderForm ? this._onRenderPrefix : undefined}
                            onRenderSuffix={this._onRenderSuffix}
                            placeholder="Search String"
                            {...this.props.textFieldProps} />
        );
    }
}

class SearchInputContainerMenuWrapper extends React.Component<ISearchInputContainerProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.menuWrapper}>
                <SearchInputContainer {...this.props} />
            </div>
        );
    }
}

const createInputContainerMenuItem = (props : ISearchInputContainerProps) : IContextualMenuItem => {
    return {
        key: "searchString",
        onRender: (item) => {
            return <SearchInputContainerMenuWrapper key={item.key} {...props} />
        }
    };
};

export {
    ISearchRequestButtonProps,
    ISearchInputContainerProps,
    SearchInputContainer,
    SearchGroupOperatorCommandBarButton,
    SearchExpandButton,
    SearchExpandContainer,
    createInputContainerMenuItem,
    createSearchGroupOperatorMenuItem
}


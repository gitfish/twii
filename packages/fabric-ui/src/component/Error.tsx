import * as React from "react";
import { isString, isObject } from "@twii/common/lib/LangUtils";
import { getClassNames } from "./Error.classNames";
import { IErrorStyles, getStyles } from "./Error.styles";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";

interface IErrorItemProps {
    title: string;
    className?: string;
    styles?: IErrorStyles;
}

class ErrorItem extends React.Component<IErrorItemProps, undefined> {
    render() {
        const styles = getStyles(undefined, this.props.styles);
        const classNames = getClassNames(styles, this.props.className);
        return (
            <div className={classNames.item}>
                <div className={classNames.itemTitle}>{this.props.title}</div>
                <div className={classNames.itemValue}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

interface IErrorProps {
    error?: any;
    className?: string;
    styles?: IErrorStyles;
}

class ErrorMessage extends React.Component<IErrorProps, any> {
    render() {
        const error = this.props.error;
        if(error) {
            const styles = getStyles(undefined, this.props.styles);
            const classNames = getClassNames(styles, this.props.className);
            const message = isString(error) ? error : error && error.message ? error.message : "An error has occurred";
            return <div className={classNames.message} key="message">{message}</div>;
        }
        return null;
    }
}

class ErrorStack extends React.Component<IErrorProps, any> {
    render() {
        const error = this.props.error;
        if(error) {
            let stack = error ? error.stack : null;
            if(stack) {
                return <ErrorItem className="stack-item" title="Stack"><pre>{stack}</pre></ErrorItem>
            }
        }
        return null;
    }
}

class ErrorDetail extends React.Component<IErrorProps, any> {
    render() {
        const error = this.props.error;
        if(error) {
            let r : React.ReactNode[] = [];
            if(isObject(error)) {
                Object.keys(error).forEach((key) => {
                    if(key !== "message" && key !== "stack") {
                        const value = error[key];
                        if(value) {
                            let valueContent;
                            if(isObject(value)) {
                                try {
                                    valueContent = <pre>{JSON.stringify(value, null, "\t")}</pre>;
                                } catch(err) {}
                            } else {
                                valueContent = String(value);
                            }

                            if(valueContent) {
                                r.push(
                                    <ErrorItem key={key} title={key}><pre>{valueContent}</pre></ErrorItem>
                                );
                            }
                        }
                    }
                });
            }
            return r;
        }
        return null;
    }
}

class Error extends React.Component<IErrorProps, any> {
    render() {
        if(this.props.error) {
            const styles = getStyles(undefined, this.props.styles);
            const classNames = getClassNames(styles, this.props.className);
            return (
                <div className={classNames.root} role="error">
                    <ErrorMessage {...this.props} />
                    <ErrorStack {...this.props} />
                    <ErrorDetail {...this.props} />
                </div>
            );
        }
        return null;
    }
}

class CompactError extends React.Component<IErrorProps, any> {
    private _onRenderTooltipContent = () => {
        return <Error error={this.props.error} />;
    };
    render() {
        if(this.props.error) {
            const styles = getStyles(undefined, this.props.styles);
            const classNames = getClassNames(styles, this.props.className);
            return (
                <div className={classNames.compact}>
                    <TooltipHost  tooltipProps={{ onRenderContent: this._onRenderTooltipContent }}>
                        <Icon iconName="Error" />
                    </TooltipHost>
                </div>
            );
        }
        return null;
    }
}

export { IErrorProps, Error, CompactError };
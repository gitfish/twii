import * as React from "react";
import { isString, isObject } from "util/Lang";
import { css } from "@uifabric/utilities/lib/css";
import { getClassNames } from "./Error.style";

interface IErrorItemProps {
    title: string;
}

class ErrorItem extends React.Component<IErrorItemProps, undefined> {
    render() {
        return (
            <div className={css("error-item", getClassNames().item)}>
                <div className={css("error-item-title", getClassNames().itemTitle)}>{this.props.title}</div>
                <div className={css("error-item-value", getClassNames().itemValue)}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

interface IErrorProps {
    error?: any;
    className?: string
}

class Error extends React.Component<IErrorProps, undefined> {
    render() {
        if(this.props.error) {
            console.error(this.props.error);
            let error = this.props.error;
            let message = isString(error) ? error : error && error.message ? error.message : "An error has occurred";
            let messageContent = <div className={css("error-message", getClassNames().message)} key="message">{message}</div>;

            let stack = error ? error.stack : null;
            let stackContent;
            if(stack) {
                stackContent = <ErrorItem key="stack" title="Stack"><pre>{stack}</pre></ErrorItem>
            }

            let otherContents : React.ReactNode[] = [];
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
                                otherContents.push(
                                    <ErrorItem key={key} title={key}><pre>{valueContent}</pre></ErrorItem>
                                );
                            }
                        }
                    }
                });
            }

            return (
                <div className={css(this.props.className, "error")} role="error">
                    {messageContent}
                    {stackContent}
                    {otherContents}
                </div>
            );
        }
        return null;
    }
}

export { Error as default, Error, IErrorProps };
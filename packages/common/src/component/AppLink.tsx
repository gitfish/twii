import * as React from "react";
import { IAppHost } from "../IAppHost";
import { IRequest } from "@twii/router/lib/IRequest";

interface IAppLinkProps {
    host: IAppHost;
    request?: IRequest;
    title?: string;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

class AppLink extends React.Component<IAppLinkProps, undefined> {
    private _onClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(this.props.onClick) {
            this.props.onClick();
        } else {
            this.props.host.load(this.props.request);
        }
    }

    render() {
        const href = this.props.host.getUrl(this.props.request);
        const content = React.Children.count(this.props.children) > 0 ? this.props.children : this.props.title;
        return (
            <a style={this.props.style} className={this.props.className} title={this.props.title} href={href} onClick={this._onClick}>{content}</a>
        );
    }
}

export { IAppLinkProps, AppLink };
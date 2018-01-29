import * as React from "react";
import IRequest from "roota/lib/IRequest";
import IAppHost from "app/IAppHost";
import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";

const groups : INavLinkGroup[] = [
    {
        links: [
            {
                key: "/index",
                name: "Home",
                url: "/index"
            },
            {
                key: "/entity/search",
                name: "Entity Search",
                url: "/entity/search"
            },
            {
                key: "/me/portal",
                name: "Match Evaluation",
                url: "/me/portal"
            }
        ]
    }
];

interface IGlobalNavContainerProps {
    host: IAppHost;
    onSelectItem?: (item : IRequest) => void;
}

class GlobalNav extends React.Component<IGlobalNavContainerProps, any> {
    _handleLinkClick = (e : React.MouseEvent<HTMLLinkElement>, link : INavLink) => {
        e.preventDefault();
        if(this.props.onSelectItem) {
            this.props.onSelectItem({ path: link.url });
        }
    }
    render() {
        return (
            <Nav groups={groups} onLinkClick={this._handleLinkClick} selectedKey={this.props.host.path} />
        );
    }
}

export { GlobalNav as default, GlobalNav }
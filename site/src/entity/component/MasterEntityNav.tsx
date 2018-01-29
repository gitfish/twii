import * as React from "react";
import { observer } from "mobx-react";
import { Nav, INavLink } from "office-ui-fabric-react/lib/Nav";
import RootAppHost from "app/RootAppHost";
import IMasterEntitySearchResultModel from "../IMasterEntitySearchResultModel";
import IMasterEntityHandleModel from "../IMasterEntityHandleModel";

interface IMasterEntityNavProps {
    masterEntityRef?: IMasterEntityHandleModel;
}

const searchPath = "/entity/search";
const searchResultPath = "/entity/search/result";

@observer
class MasterEntityNav extends React.Component<any, any> {
    render() {
        const links : INavLink[] = [];
        links.push({
            key: searchPath,
            name: "Search",
            url: RootAppHost.getUrl({ path: searchPath }),
            onClick: (e : React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                RootAppHost.load({ path: searchPath });
            }
        });
        links.push({
            key: searchResultPath,
            name: "Search Results",
            url: RootAppHost.getUrl({ path: searchResultPath }),
            onClick: (e : React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                RootAppHost.load({ path: searchResultPath });
            }
        });
        
        if(this.props.masterEntityRef && this.props.masterEntityRef.masterEntityId) {
            let subLinks : INavLink[];
            let name;
            if(this.props.masterEntityRef.sync.syncing) {
                name = "Loading...";
            } else if(this.props.masterEntityRef.sync.error) {
                name = "Error";
            } else {
                const e = this.props.masterEntityRef.ref;
                name = e.name.standardFullName;
                if(e.sources.length > 0) {
                    subLinks = [];
                    e.sources.forEach((s) => {
                        subLinks.push({
                            key: s.sourceSystemCode,
                            name: s.sourceSystemCode,
                            url: `#${s.sourceSystemCode}`
                        });
                    });
                }
            }
            const entityId = this.props.masterEntityRef.masterEntityId;
            const entityPath = `/entity/${encodeURIComponent(entityId)}`;

            links.push({
                key: entityPath,
                name: name,
                url: RootAppHost.getUrl({ path: entityPath }),
                onClick: (e : React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    RootAppHost.load({ path: entityPath });
                },
                links: subLinks,
                isExpanded: subLinks && subLinks.length > 0 ? true : false
            });
        }
        return (
            <Nav groups={[
                {
                    name: "Master Entity",
                    links: links
                }
            ]} selectedKey={RootAppHost.path} />
        );
    }
}

export { MasterEntityNav as default, MasterEntityNav };
import * as React from "react";
import { observer } from "mobx-react";
import { IListingModel } from "../model/IListingModel";
import { Link } from "office-ui-fabric-react/lib/Link";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface IListingLinksProps {
    listing: IListingModel;
}

@observer
class ListingLinks extends React.Component<IListingLinksProps, any> {
    render() {
        const links = this.props.listing.doc_urls;
        let content;
        if(links && links.length > 0) {
            content = links.map(link => {
                return (
                    <div key={link.name + link.url}><Link href={link.url} target={link.name}>{link.name}</Link></div>
                );
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>No Links available</MessageBar>;
        }
        return (
            <div style={{ padding: 8 }}>
                {content}
            </div>
        );
    }
}

export { IListingLinksProps, ListingLinks }
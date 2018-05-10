import * as React from "react";
import { observer } from "mobx-react";
import { IListingListContainerProps, ListingListContainer } from "./ListingList";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IListingListPageStyles, getStyles } from "./ListingListPage.styles";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { getClassNames } from "./ListingListPage.classNames";
import { UserAdminContainer } from "../../user/component/UserAuthContainer";

interface IListingListPageProps extends IListingListContainerProps {
    styles?: IListingListPageStyles;
    className?: string;
}

@observer
class ListingListSearchInput extends React.Component<IListingListPageProps, any> {
    private _onSearchChange = (newValue : any) => {
        this.props.listings.setSearchText(newValue);
    } 
    render() {
        return <SearchBox value={this.props.listings.searchText} onChange={this._onSearchChange} />
    }
}

class ListingListPage extends React.Component<IListingListPageProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className); 
        return (
            <div className={classNames.root}>
                <div className={classNames.header}>
                    <ListingListSearchInput {...this.props} />
                </div>
                <div className={classNames.body}>
                    <ListingListContainer {...this.props} />
                </div>
            </div>
        );
    }
}

export { IListingListPageProps, ListingListPage }


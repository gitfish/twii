import * as React from "react";
import { observer } from "mobx-react";
import { IListingListContainerProps, ListingListContainer } from "./ListingList";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IListingListPageStyles, getStyles } from "./ListingListPage.styles";
import { UserAuthContainer } from "user/component/UserAuthContainer";
import { UserGroup } from "user/UserGroup";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { getClassNames } from "./ListingListPage.classNames";

interface IListingListPageProps extends IListingListContainerProps {
    styles?: IListingListPageStyles;
    className?: string;
    onAdd?: () => void;
    onShowStore?: () => void;
}

@observer
class ListingListAdminCommandBar extends React.Component<IListingListPageProps, any> {
    private _onClickRefresh = () => {
        this.props.listings.refresh();
    }
    render() {
        const items : IContextualMenuItem[] = [];
        const farItems : IContextualMenuItem[] = [];
        if(this.props.onAdd) {
            items.push({
                key: "addListing",
                name: "Add Listing",
                iconProps: { iconName: "Add" },
                onClick: this.props.onAdd
            });
        }
        if(this.props.onShowStore) {
            farItems.push({
                key: "showStore",
                name: "Show Shop",
                iconProps: { iconName: "Shop"},
                onClick: this.props.onShowStore
            });
        }
        farItems.push({
            key: "refresh",
            name: "Refresh",
            iconProps: { iconName: "Refresh"},
            onClick: this._onClickRefresh,
            disabled: this.props.listings.sync.syncing
        })
        if(items.length > 0 || farItems.length > 0) {
            return <CommandBar items={items} farItems={farItems} />;
        }
        return null;
    }
}

class ListingListAdminCommandBarContainer extends React.Component<IListingListPageProps, any> {
    private _onRenderAuth = () => {
        return <ListingListAdminCommandBar {...this.props} />;
    }
    render() {
        return <UserAuthContainer requiredAuthGroup={UserGroup.ADMIN} onRenderUser={this._onRenderAuth} />;
    }
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
                <ListingListAdminCommandBarContainer {...this.props} />
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


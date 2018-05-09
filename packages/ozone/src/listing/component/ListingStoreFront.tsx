import * as React from "react";
import { observer } from "mobx-react";
import { Sync } from "@twii/fabric-ui/lib/component/Sync";
import { IListing } from "../IListing";
import { IListingStoreFrontModel } from "../model/IListingStoreFrontModel";
import { ListingList } from "./ListingList";
import { IListingStoreFrontStyles, getStyles } from "./ListingStoreFront.styles";
import { getClassNames } from "./ListingStoreFront.classNames";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { UserAuthContainer, UserAdminContainer } from "../../user/component/UserAuthContainer";
import { isNotBlank } from "@twii/common/lib/StringUtils";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";

interface IListingStoreFrontProps {
    storeFront: IListingStoreFrontModel;
    onSelectItem?: (listing : IListing) => void;
    onAdd?: () => void;
    onShowAllListings?: () => void;
    className?: string;
    styles?: IListingStoreFrontStyles;
    adminGroup?: string;
}

interface IListingStoreFrontSectionProps {
    title: any;
}

@observer
class ListingStoreFrontSection extends React.Component<IListingStoreFrontSectionProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined));
        return (
            <div className={classNames.section}>
                <div className={classNames.sectionHeader}>
                    <div className={classNames.sectionTitle}>{this.props.title}</div>
                </div>
                <div className={classNames.sectionBody}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class ListingStoreFrontFeaturedSection extends React.Component<IListingStoreFrontProps, any> {
    private _onRenderDone = () => {
        const featured = this.props.storeFront.value ? this.props.storeFront.value.featured : undefined;
        if(featured && featured.length > 0) {
            return <ListingList listings={featured} compact wrapping onSelectItem={this.props.onSelectItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No Featured Listings available</MessageBar>;
    }
    render() {
        return (
            <ListingStoreFrontSection
                title="Featured">
                <Sync sync={this.props.storeFront.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Featured Listings..." />
            </ListingStoreFrontSection>
        );
    }
}

class ListingStoreFrontMostPopularSection extends React.Component<IListingStoreFrontProps, any> {
    private _onRenderDone = () => {
        const mostPopular = this.props.storeFront.value ? this.props.storeFront.value.most_popular : undefined;
        if(mostPopular && mostPopular.length > 0) {
            return <ListingList listings={mostPopular} compact wrapping onSelectItem={this.props.onSelectItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No Most Popular Listings available</MessageBar>;
    }
    render() {
        return (
            <ListingStoreFrontSection
                title="Most Popular">
                <Sync sync={this.props.storeFront.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Most Popular Listings..." />
            </ListingStoreFrontSection>
        );
    }
}

class ListingStoreFrontRecommendedSection extends React.Component<IListingStoreFrontProps, any> {
    private _onRenderDone = () => {
        const recommended = this.props.storeFront.value ? this.props.storeFront.value.recommended : undefined;
        if(recommended && recommended.length > 0) {
            return <ListingList listings={recommended} compact wrapping onSelectItem={this.props.onSelectItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No Recommended Listings available</MessageBar>;
    }
    render() {
        return (
            <ListingStoreFrontSection
                title="Recommended">
                <Sync sync={this.props.storeFront.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Recommended Listings..." />
            </ListingStoreFrontSection>
        );
    }
}

class ListingStoreFrontRecentSection extends React.Component<IListingStoreFrontProps, any> {
    private _onRenderDone = () => {
        const recent = this.props.storeFront.value ? this.props.storeFront.value.recent : undefined;
        if(recent && recent.length > 0) {
            return <ListingList listings={recent} compact wrapping onSelectItem={this.props.onSelectItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No Recent Listings available</MessageBar>;
    }
    render() {
        return (
            <ListingStoreFrontSection
                title="Recent">
                <Sync sync={this.props.storeFront.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Recent Listings..." />
            </ListingStoreFrontSection>
        );
    }
}

@observer
class ListingStoreFrontSearchInput extends React.Component<IListingStoreFrontProps, any> {
    private _onSearchChange = (newValue : any) => {
        this.props.storeFront.setSearchText(newValue);
    } 
    render() {
        return <SearchBox value={this.props.storeFront.searchText} placeholder="Search Listings" onChange={this._onSearchChange} />
    }
}

@observer
class ListingStoreFrontSearchResultsSection extends React.Component<IListingStoreFrontProps, any> {
    private _onRenderDone = () => {
        if(this.props.storeFront.searchResults && this.props.storeFront.searchResults.length > 0) {
            return <ListingList listings={this.props.storeFront.searchResults} compact={true} onSelectItem={this.props.onSelectItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No matching listings found</MessageBar>;
    }
    render() {
        if(isNotBlank(this.props.storeFront.searchText)) {
            return (
                <ListingStoreFrontSection
                    title={<span>Listings matching <strong>{this.props.storeFront.searchText}</strong></span>}>
                    <Sync sync={this.props.storeFront.searchSync} onRenderDone={this._onRenderDone} syncLabel="Searching Listings..." />
                </ListingStoreFrontSection>
            );
        }
        return null;
    }
}

class ListingStoreFront extends React.Component<IListingStoreFrontProps, any> {
    private _onClickAdd = () => {
        this.props.onAdd();
    }
    render() {
        const styles = getStyles(undefined, this.props.styles);
        const classNames = getClassNames(styles);
        return (
            <div className={classNames.root}>
                <div className={classNames.header}>
                    <div className={classNames.searchInputContainer}>
                        <ListingStoreFrontSearchInput {...this.props} />
                    </div>
                </div>
                <div className={classNames.body}>
                    <ListingStoreFrontSearchResultsSection {...this.props} />
                    <ListingStoreFrontFeaturedSection {...this.props} />
                    <ListingStoreFrontMostPopularSection {...this.props} />
                    <ListingStoreFrontRecommendedSection {...this.props} />
                    <ListingStoreFrontRecentSection {...this.props} />
                </div>
            </div>
        );
    }
}

class ListingStoreFrontContainer extends React.Component<IListingStoreFrontProps, any> {
    componentWillMount() {
        this.props.storeFront.load();
    }
    render() {
        return <ListingStoreFront {...this.props} />
    }
}

export { IListingStoreFrontProps, ListingStoreFrontContainer, ListingStoreFront }
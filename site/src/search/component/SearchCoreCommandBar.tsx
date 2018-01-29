import * as React from "react";
import { observer } from "mobx-react";
import ISearchCoreModel from "../ISearchCoreModel";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

interface ISearchCoreCommandBarProps {
    result: ISearchCoreModel;
}

@observer
class SearchCoreCommandBar extends React.Component<ISearchCoreCommandBarProps, any> {
    _handlePageFirst = () => {
        this.props.result.first();
    }
    _handlePagePrev = () => {
        this.props.result.prev();
    }
    _handlePageNext = () => {
        this.props.result.next();
    }
    _handlePageLast = () => {
        this.props.result.last();
    }
    render() {
        const items : IContextualMenuItem[] = [];
        items.push({
            key: "total",
            name: `Found: ${this.props.result.total}`,
            itemType: ContextualMenuItemType.Header
        });
        const farItems : IContextualMenuItem[] = [];
        farItems.push({
            key: "pageFirst",
            name: "",
            onRender(item) {
                return (
                    <DefaultButton disabled={item.disabled} className="ms-CommandBarItem-custom-button" onClick={item.onClick}>
                        <i className="ms-CommandBarItem-icon material-icons">{"\uE5DC"}</i>
                        {item.name}
                    </DefaultButton>
                );
            },
            disabled: this.props.result.isFirst,
            onClick: this._handlePageFirst
        });
        farItems.push({
            key: "pagePrev",
            name: "",
            onRender(item) {
                return (
                    <DefaultButton disabled={item.disabled} className="ms-CommandBarItem-custom-button" onClick={item.onClick}>
                        <i className="ms-CommandBarItem-icon material-icons">{"\uE5CB"}</i>
                        {item.name}
                    </DefaultButton>
                );
            },
            disabled: !this.props.result.hasPrev,
            onClick: this._handlePagePrev
        });
        farItems.push({
            key: "pageOffset",
            name: `Page ${this.props.result.pageOffset + 1} / ${this.props.result.pageCount}`,
            itemType: ContextualMenuItemType.Header
        });
        farItems.push({
            key: "pageNext",
            name: "",
            onRender(item) {
                return (
                    <DefaultButton disabled={item.disabled} className="ms-CommandBarItem-custom-button" onClick={item.onClick}>
                        <i className="ms-CommandBarItem-icon material-icons">{"\uE5CC"}</i>
                        {item.name}
                    </DefaultButton>
                );
            },
            disabled: !this.props.result.hasNext,
            onClick: this._handlePageNext
        });
        farItems.push({
            key: "pageLast",
            name: "",
            onRender(item) {
                return (
                    <DefaultButton disabled={item.disabled} className="ms-CommandBarItem-custom-button" onClick={item.onClick}>
                        <i className="ms-CommandBarItem-icon material-icons">{"\uE5DD"}</i>
                        {item.name}
                    </DefaultButton>
                );
            },
            disabled: this.props.result.isLast,
            onClick: this._handlePageLast
        });
        farItems.push({
            key: "settings",
            name: "",
            iconProps: { iconName: "Settings" },
            subMenuProps: {
                items: [
                    {
                        key: "pageSize",
                        name: `Page Size`,
                        itemType: ContextualMenuItemType.Header
                    },
                    {
                        key: "pageSize-10",
                        name: "10",
                        canCheck: true,
                        checked: this.props.result.limit === 10,
                        onClick: () => {
                            this.props.result.setLimit(10);
                        }
                    },
                    {
                        key: "pageSize-20",
                        name: "20",
                        canCheck: true,
                        checked: this.props.result.limit === 20,
                        onClick: () => {
                            this.props.result.setLimit(20);
                        }
                    },
                    {
                        key: "pageSize-50",
                        name: "50",
                        canCheck: true,
                        checked: this.props.result.limit === 50,
                        onClick: () => {
                            this.props.result.setLimit(50);
                        }
                    },
                    {
                        key: "pageSize-100",
                        name: "100",
                        canCheck: true,
                        checked: this.props.result.limit === 100,
                        onClick: () => {
                            this.props.result.setLimit(100);
                        }
                    }
                ]
            }
        });
        return <CommandBar className="search-command-bar" items={items} farItems={farItems} />;
    }
}

export { SearchCoreCommandBar as default, SearchCoreCommandBar, ISearchCoreCommandBarProps }
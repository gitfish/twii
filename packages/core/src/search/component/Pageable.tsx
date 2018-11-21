import * as React from "react";
import { observer } from "mobx-react";
import { IPageableModel } from "../model/IPageableModel";
import { CommandBarButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { getTheme } from "@uifabric/styling";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";

interface IPageableProps {
    pageable: IPageableModel;
}

@observer
class PageableRecordSummary extends React.Component<IPageableProps, any> {
    render() {
        const { pageable } = this.props;
        if(pageable.total > 0) {
            const start = pageable.offset;
            let end = start + pageable.limit;
            if(end > pageable.total) {
                end = pageable.total;
            }
            const msgStart = pageable.sync.syncing || !pageable.isAppend ? start + 1 : 1;
            const content = <span>{pageable.sync.syncing ? "Loading" : "Showing"} <strong>{msgStart}</strong> to <strong>{end}</strong> of <strong>{pageable.total}</strong></span>;
            return (
                <CommandBarButton disabled>
                    {content}
                </CommandBarButton>
            );
        }
        return null;
    }
}

const createRecordSummaryItem = (props : IPageableProps, key : string = "pageableRecordSummary") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <PageableRecordSummary key={item.key} {...props} />;
        }
    };
};

@observer
class PageablePageSummary extends React.Component<IPageableProps, any> {
    private _onRenderSync = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const { pageable } = this.props;
        if(pageable.total > 0) {
            const onRenderIcon = pageable.sync.syncing ? this._onRenderSync : undefined;
            const content = <span>Page <strong>{pageable.pageOffset + 1}</strong> / <strong>{pageable.pageCount}</strong></span>;
            return (
                <CommandBarButton onRenderIcon={onRenderIcon} disabled>
                    {content}
                </CommandBarButton>
            );
        }
        return null;
    }
}

const createPageSummaryItem = (props : IPageableProps, key : string = "pageablePageSummary") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <PageablePageSummary key={item.key} {...props} />;
        }
    };
};

interface IPageableButtonProps extends IPageableProps {
    buttonProps?: IButtonProps;
}

@observer
class PageableFirstButton extends React.Component<IPageableButtonProps, any> {
    private _onClick = () => {
        this.props.pageable.first();
    }
    render() {
        const { pageable } = this.props;
        if(pageable.total > pageable.limit) {
            return (
                <CommandBarButton {...this.props.buttonProps}
                                disabled={pageable.isFirst || pageable.sync.syncing}
                                iconProps={{ iconName: "ChevronLeftEnd6" }}
                                onClick={this._onClick}>
                </CommandBarButton>
            );
        }
        return null;
    }
}

const createFirstMenuItem = (props : IPageableProps, key : string = "pageableFirst") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <PageableFirstButton key={item.key} {...props} buttonProps={{ title: "Go to first page"}} />;
        }
    };
};

@observer
class PageablePreviousButton extends React.Component<IPageableButtonProps, any> {
    private _onClick = () => {
        this.props.pageable.previous();
    }
    render() {
        const { pageable } = this.props;
        if(pageable.total > pageable.limit) {
            return (
                <CommandBarButton {...this.props.buttonProps}
                                disabled={!pageable.hasPrevious || pageable.sync.syncing}
                                iconProps={{ iconName: "ChevronLeftSmall" }}
                                onClick={this._onClick}>
                </CommandBarButton>
            );
        }
        return null;
    }
}

const createPreviousMenuItem = (props : IPageableProps, key : string = "pageablePrevious") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <PageablePreviousButton key={item.key} {...props} buttonProps={{ title: "Go to previous page"}} />;
        }
    };
};

@observer
class PageableNextButton extends React.Component<IPageableButtonProps, any> {
    private _onClick = () => {
        this.props.pageable.next();
    }
    render() {
        const { pageable } = this.props;
        if(pageable.total > pageable.limit) {
            return (
                <CommandBarButton {...this.props.buttonProps}
                                disabled={!pageable.hasNext || pageable.sync.syncing}
                                iconProps={{ iconName: "ChevronRightSmall" }}
                                onClick={this._onClick}>
                </CommandBarButton>
            );
        }
        return null;
    }
}

const createNextMenuItem = (props : IPageableProps, key : string = "pageableNext") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <PageableNextButton key={item.key} {...props} buttonProps={{ title: "Go to next page"}} />;
        }
    };
};

@observer
class PageableLastButton extends React.Component<IPageableButtonProps, any> {
    private _onClick = () => {
        this.props.pageable.last();
    }
    render() {
        const { pageable } = this.props;
        if(pageable.total > pageable.limit && pageable.isOffsetPagingMode) {
            return (
                <CommandBarButton {...this.props.buttonProps}
                                disabled={pageable.isLast || pageable.sync.syncing}
                                iconProps={{ iconName: "ChevronRightEnd6" }}
                                onClick={this._onClick}>
                </CommandBarButton>
            );
        }
        return null;
    }
};

const createLastMenuItem = (props : IPageableProps, key : string = "pageableLast") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <PageableLastButton key={item.key} {...props} buttonProps={{ title: "Go to last page"}} />;
        }
    };
};

@observer
class RowLimitReachedInfo extends React.Component<IPageableButtonProps, any> {
    render() {
        const { pageable } = this.props;
        if(!pageable.sync.syncing && pageable.hasReachedOffsetLimit) {
            const iconProps : IIconProps = {
                iconName: "Info",
                styles: {
                    root: {
                        color: getTheme().palette.orange
                    }
                }
            };
            return (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: 8, paddingRight: 8 }}>
                    <TooltipHost content="It's been a long journey and you must be tired. To save some travel, please refine your search criteria.">
                        <Icon {...iconProps} />
                    </TooltipHost>
                </div>
            );
        }
        return null;
    }
}

const createRowLimitReachedMenuItem = (props : IPageableProps, key : string = "pageableRowLimitExceeded") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <RowLimitReachedInfo key={item.key} {...props} />;
        }
    }
};

const addPagerMenuItems = (props : IPageableProps, to: IContextualMenuItem[], keyBase : string = "pageable", includePageSummary : boolean = false) => {
    to.push(
        createFirstMenuItem(props),
        createPreviousMenuItem(props)
    );
    if(includePageSummary) {
        to.push(
            createPageSummaryItem(props)
        )
    }
    to.push(
        createNextMenuItem(props),
        createLastMenuItem(props)
    );
};

export {
    IPageableProps,
    PageableRecordSummary,
    PageablePageSummary,
    PageableFirstButton,
    PageablePreviousButton,
    PageableNextButton,
    PageableLastButton,
    createRecordSummaryItem,
    createPageSummaryItem,
    createFirstMenuItem,
    createPreviousMenuItem,
    createNextMenuItem,
    createLastMenuItem,
    RowLimitReachedInfo,
    createRowLimitReachedMenuItem,
    addPagerMenuItems,
}
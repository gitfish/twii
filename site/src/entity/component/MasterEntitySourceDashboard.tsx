import * as React from "react";
import { observer } from "mobx-react";
import IMasterEntityModel from "../IMasterEntityModel";
import DashboardStorageServiceContext from "dashboard/DashboardStorageServiceContext";
import { byCode, IMasterEntitySourceConfigEntry } from "../MasterEntitySourceConfig";
import DashboardWrapper from "dashboard/component/DashboardWrapper";
import { DashboardContainer } from "dashboard/component/Dashboard";
import Dashboard from "dashboard/Dashboard";
import IDashboard from "dashboard/IDashboard";
import Stack from "dashboard/Stack";
import Window from "dashboard/Window";
import IWindow from "dashboard/IWindow";
import IWindowManager from "dashboard/IWindowManager";
import IMasterEntitySearchRequest from "entity/IMasterEntitySearchRequest";
import IAppHost from "app/IAppHost";
import { compare } from "util/Sort";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { createActivityFilterItem, defaultRenderContent } from "common/component/ActivityFilterMenuHelper";
import { createDashboardLayoutItem } from "dashboard/component/DashboardLayoutButton";

const storageKey = "analyst-desktop-entiy-source-dashboard";

const createWindowConfigFromEntry = (props : IMasterEntitySourceDashboardProps, entry : IMasterEntitySourceConfigEntry) => {
    return {
        type: "window",
        title: entry.title,
        path: `/entity/${encodeURIComponent(props.masterEntity.masterEntityId)}/sources/${encodeURIComponent(entry.key)}`,
        params: {
            sourceSystemCode: entry.key,
            onSearch: props.onSearch
        }
    };
};

const getDefaultDashboardConfig = (props : IMasterEntitySourceDashboardProps) => {
    let windows : any[] = [];
    const entries : IMasterEntitySourceConfigEntry[] = [];
    props.masterEntity.sourceCodes.forEach(sourceSystemCode => {
        const e = byCode(sourceSystemCode);
        if(e) {
            entries.push(e);
        }
    });
    entries.sort((l, r) => compare(l.title, r.title));
    entries.forEach(e => {
        windows.push(createWindowConfigFromEntry(props, e));
    });
    const stack = {
        type: "stack",
        windows: windows,
        activeIndex: 0
    };
    return {
        type: "dashboard",
        margin: 0,
        component: stack,
        closeDisabled: true
    };
};

const getUpdatedDashboardConfig = (props : IMasterEntitySourceDashboardProps, existingConfig : any) : Promise<any> => {
    // Here is the BS for loading the state of the source systems for an entity
    
    const sourceSystemCodes = props.masterEntity.sourceCodes;
    // create a temporary dashboard for doing our source system reconciliation based
    // on current positions
    // TODO: disable rendering etc on the dashboard - we don't want unnecessary stuff happening here
    const rdb = new Dashboard();
    // e.g. rdb.setOffline(true);
    
    return rdb.setConfig(existingConfig).then(() => {
        const windows : IWindow[] = rdb.findAll(c => {
            return c.type === "window";
        }) as IWindow[];
        
        const keepWindows = windows.filter(w => sourceSystemCodes.indexOf(w.params.sourceSystemCode) >= 0);
        const windowsForRemoval = windows.filter(w => sourceSystemCodes.indexOf(w.params.sourceSystemCode) < 0);
        
        windowsForRemoval.forEach(w => w.removeFromParent());

        const existingSourceCodes : string[] = [];
        keepWindows.forEach(w => {
            const sourceSystemCode = w.params.sourceSystemCode;
            const sourceSystemEntry = byCode(sourceSystemCode);
            existingSourceCodes.push(sourceSystemCode);
            w.load({
                path: `/entity/${encodeURIComponent(props.masterEntity.masterEntityId)}/sources/${encodeURIComponent(w.params.sourceSystemCode)}`,
                params: { sourceSystemCode: sourceSystemCode, onSearch: props.onSearch },
                title: sourceSystemEntry ? sourceSystemEntry.description : undefined,
                replace: true
            });
        });

        const entries : IMasterEntitySourceConfigEntry[] = [];
        sourceSystemCodes.forEach(sourceSystemCode => {
            const e = existingSourceCodes.indexOf(sourceSystemCode) < 0 ? byCode(sourceSystemCode) : undefined;
            if(e) {
                entries.push(e);
            }
        });
        let newWindows;
        if(entries.length > 0) {
            entries.sort((l, r) => compare(l.title, r.title));
            newWindows = entries.map(e => {
                const window = new Window();
                window.setConfig(createWindowConfigFromEntry(props, e));
                return window;
            });
        } else {
            newWindows = [];
        }

        // find the first container of any type to add the new windows to
        let mgr = rdb.findFirst(c => {
            return c.type === "list" || c.type === "stack";
        }) as IWindowManager;
        if(mgr) {
            newWindows.forEach(w => mgr.add(w));
        } else {
            // this is a bit of a rubbish scenario
            const stack = new Stack();
            mgr = stack;
            keepWindows.forEach(w => stack.add(w));
            newWindows.forEach(w => stack.add(w));
            rdb.setComponent(stack);
        }

        if(!mgr.active && mgr.windowCount > 0) {
            mgr.setActive(mgr.windows[0]);
        }

        return rdb.config;
    });

};

const createEntitySourceLoader = (props : IMasterEntitySourceDashboardProps) => {
    return () => {
        return DashboardStorageServiceContext.value.getItem(storageKey).then(config => {
            if(!config) {
                return getDefaultDashboardConfig(props);
            }
            return getUpdatedDashboardConfig(props, config);
        });
    };
};

const entitySourceSaver = (data) => {
    return DashboardStorageServiceContext.value.setItem(storageKey, data);
};

interface IMasterEntitySourceDashboardProps {
    masterEntity: IMasterEntityModel;
    host?: IAppHost;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

interface IMasterEntitySourceDashboardCommandBarProps {
    masterEntity: IMasterEntityModel;
    dashboard: IDashboard;
}

@observer
class MasterEntitySourceDashboardCommandBar extends React.Component<IMasterEntitySourceDashboardCommandBarProps, any> {
    private _onRenderFilterContent = (filter) => {
        if(filter.specified) {
            return <span>Activities matching: {defaultRenderContent(filter)}</span>
        } 
        return <span>All Activities</span>;
    }
    render() {
        const items : IContextualMenuItem[] = [
            createActivityFilterItem({ activityFilter: this.props.masterEntity.activityFilter, onRenderContent: this._onRenderFilterContent })
        ];
        const farItems : IContextualMenuItem[] = [
            createDashboardLayoutItem(this.props.dashboard)
        ];
        
        return (
            <CommandBar className="master-entity-source-dashboard-command-bar" items={items} farItems={farItems} />
        );
    }
}

class MasterEntitySourceDashboard extends React.Component<IMasterEntitySourceDashboardProps, any> {
    dashboard : Dashboard = new Dashboard();
    constructor(props : IMasterEntitySourceDashboardProps) {
        super(props);
        this._setupDashboard(props);
    }
    private _setupDashboard(props : IMasterEntitySourceDashboardProps) {
        this.dashboard.loader = createEntitySourceLoader(props);
        this.dashboard.saver = entitySourceSaver;
    }
    componentWillReceiveProps(nextProps) {
        this._setupDashboard(nextProps);
        this.dashboard.load();
    }
    componentWillMount() {
        this.dashboard.load();
    }
    componentWillUnmount() {
        this.dashboard.unmount();
    }
    render() {
        return (
            <div className="master-entity-source-dashboard">
                <MasterEntitySourceDashboardCommandBar masterEntity={this.props.masterEntity} dashboard={this.dashboard} />
                <div className="master-entity-source-dashboard-container">
                    <DashboardContainer dashboard={this.dashboard} host={this.props.host} />
                </div>
            </div>
        );
    }
}

export { MasterEntitySourceDashboard as default, MasterEntitySourceDashboard }


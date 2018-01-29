import * as React from "react";
import IMasterEntityModel from "../IMasterEntityModel";
import StorageServiceContext from "common/StorageServiceContext";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import DashboardWrapper from "dashboard/component/DashboardWrapper";
import { IDashboardStyles, getStyles } from "dashboard/component/Dashboard.styles";
import IAppHost from "app/IAppHost";
import { compare } from "util/Sort";

const getEntityDashboardConfig = (props : IMasterEntityDashboardProps) => {
    return {
        type: "dashboard",
        margin: 0,
        component: {
            type: "vsplit",
            offset: 0.25,
            top: {
                component: {
                    type: "window",
                    path: `/entity/${encodeURIComponent(props.masterEntity.masterEntityId)}/summary`,
                    params: {
                        onSearch: props.onSearch
                    }
                }
            },
            bottom: {
                component: {
                    type: "window",
                    path: `/entity/${encodeURIComponent(props.masterEntity.masterEntityId)}/sources`,
                    params: {
                        onSearch: props.onSearch
                    }
                }
            }
        }
    };
};

interface IMasterEntityDashboardProps {
    masterEntity: IMasterEntityModel;
    host?: IAppHost;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class MasterEntityDashboard extends React.Component<IMasterEntityDashboardProps, any> {
    render() {
        return <DashboardWrapper className="master-entity-dashboard"
                              host={this.props.host}
                              config={getEntityDashboardConfig(this.props)} />;
    }
}

export { MasterEntityDashboard as default, MasterEntityDashboard }
import * as React from "react";
import StorageServiceContext from "common/StorageServiceContext";
import DashboardWrapper from "dashboard/component/DashboardWrapper";
import IAppHost from "app/IAppHost";
import { compare } from "util/Sort";

const getDashboardConfig = (props : IEntityCargoDashboardProps) => {
    return {
        type: "dashboard",
        component: {
            type: "vsplit",
            offset: 0.5,
            top: {
                component: {
                    type: "window",
                    path: `/entity/${encodeURIComponent(props.entityId)}/sources/cargo/air`
                }
            },
            bottom: {
                component: {
                    type: "window",
                    path: `/entity/${encodeURIComponent(props.entityId)}/sources/cargo/sea`
                }
            }
        }
    };
};

interface IEntityCargoDashboardProps {
    entityId: string;
    host?: IAppHost;
}

class EntityCargoDashboard extends React.Component<IEntityCargoDashboardProps, any> {
    render() {
        return <DashboardWrapper className="entity-dashboard"
                              host={this.props.host}
                              config={getDashboardConfig(this.props)} />;
    }
}

export { EntityCargoDashboard as default, EntityCargoDashboard }
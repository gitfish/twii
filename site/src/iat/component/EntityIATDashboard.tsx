import * as React from "react";
import DashboardWrapper from "dashboard/component/DashboardWrapper";
import IMasterEntitySearchRequest from "entity/IMasterEntitySearchRequest";
import IAppHost from "app/IAppHost";

const getDashboardConfig = (props : IEntityIATDashboardProps) => {
    return {
        type: "dashboard",
        component: {
            type: "vsplit",
            offset: 0.3,
            top: {
                component: {
                    type: "window",
                    path: `/entity/${encodeURIComponent(props.entityId)}/sources/iat/movements/list`,
                    params: { onSearch: props.onSearch }
                }
            },
            bottom: {
                component: {
                    type: "window",
                    path: `/entity/${encodeURIComponent(props.entityId)}/sources/iat/movements/map`,
                    params: { onSearch: props.onSearch }
                }
            }
        }
    };
};

interface IEntityIATDashboardProps {
    entityId: string;
    host?: IAppHost;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class EntityIATDashboard extends React.Component<IEntityIATDashboardProps, any> {
    render() {
        return <DashboardWrapper className="entity-dashboard"
                                 host={this.props.host}
                                 config={getDashboardConfig(this.props)} />;
    }
}

export { EntityIATDashboard as default, EntityIATDashboard }
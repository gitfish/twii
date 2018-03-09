import * as React from "react";
import packageInfo from "package.json";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";

class PackageInfo extends React.Component<any, any> {
    render() {
        return (
            <pre>
                {JSON.stringify(packageInfo, null, "\t")}
            </pre>
        )
    }
}

class PackageApp extends React.Component<IAppProps, any> {
    render() {
        return (
            <AppHostView host={this.props.host} title="Package Information">
                <PackageInfo />
            </AppHostView>
        )
    }
}

export { PackageApp, PackageInfo }
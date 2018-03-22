import * as React from "react";
import packageInfo from "package.json";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostNavigationView } from "@twii/common/lib/component/HostNavigationView";

class PackageInfo extends React.Component<any, any> {
    render() {
        return (
            <pre>
                {JSON.stringify(packageInfo, null, "\t")}
            </pre>
        )
    }
}

export { PackageInfo }
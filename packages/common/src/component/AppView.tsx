import * as React from "react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";

interface IAppViewProps {
    items?: IContextualMenuItem[];
    farItems?: IContextualMenuItem[];
}

class AppView extends React.Component<IAppViewProps, any> {
    protected _renderCommandBar() : React.ReactNode {
        return null;
    }
    protected _renderMain() : React.ReactNode {
        return null;
    }
    render() {

    }
}
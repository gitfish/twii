import * as React from "react";
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller } from "rmwc/Tabs";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

interface ITabsSampleState {
    activeTabIndex: number;
    activeTabIndex2: number;
    activeTabIndex3: number;
    activeTabIndex4: number;
}

class TabsSample extends React.Component<any, ITabsSampleState> {
    constructor(props : any) {
        super(props);
        this.state = {
            activeTabIndex: 0,
            activeTabIndex2: 0,
            activeTabIndex3: 0,
            activeTabIndex4: 0
        };
    }
    render() {
        return (
            <div>
                <TabBar
                  activeTabIndex={this.state.activeTabIndex}
                  onChange={evt => this.setState({activeTabIndex: evt.target.value})}
                >
                  <Tab>Cookies</Tab>
                  <Tab>Pizza</Tab>
                  <Tab>Icecream</Tab>
                </TabBar>
                
                <TabBar
                  activeTabIndex={this.state.activeTabIndex2}
                  onChange={evt => this.setState({activeTabIndex2: evt.target.value})}
                >
                  <Tab><TabIcon>star_border</TabIcon></Tab>
                  <Tab><TabIcon>favorite_border</TabIcon></Tab>
                  <Tab><TabIcon>mood</TabIcon></Tab>
                </TabBar>
                
                <TabBar
                  activeTabIndex={this.state.activeTabIndex3}
                  onChange={evt => this.setState({activeTabIndex3: evt.target.value})}
                >
                  <Tab><TabIcon>star_border</TabIcon><TabIconText>Featured</TabIconText></Tab>
                  <Tab><TabIcon>favorite_border</TabIcon><TabIconText>Favorites</TabIconText></Tab>
                  <Tab><TabIcon>mood</TabIcon><TabIconText>Feedback</TabIconText></Tab>
                </TabBar>
                
                {/* TabBar wrapped in TabBarScroller */}
                <TabBarScroller>
                  <TabBar
                    activeTabIndex={this.state.activeTabIndex4}
                    onChange={evt => this.setState({activeTabIndex4: evt.target.value})}
                  >
                    <Tab>Cookies</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Icecream</Tab>
                    <Tab>Chocolate</Tab>
                    <Tab>Fishsticks</Tab>
                    <Tab>Ratatouille</Tab>
                    <Tab>Bread</Tab>
                    <Tab>Rolls</Tab>
                    <Tab>Sushi</Tab>
                    <Tab>Cupcake</Tab>
                  </TabBar>
                </TabBarScroller>
            </div>
        )
    }
}

class TabsSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("RMWC Tabs Samples");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <TabsSample />
            </SampleHostAppView>
        );
    }
}

export { TabsSampleApp }
import * as React from "react";
import { getIcon } from 'office-ui-fabric-react/lib/Styling';
import IIATAssociatedTravellersGraphModel from "../IIATAssociatedTravellersGraphModel";
import "./IATAssociatedTravellerGraph.scss";
import * as vis from "vis";

const MovementIcon = getIcon('AirplaneSolid');

const graphOptions = {
    groups: {
        movements: {
            shape: 'icon',
            icon: {
                face: MovementIcon.subset.fontFace.fontFamily,
                code: MovementIcon.code,
                size: 40,
                color: '#57169a'
            },
            font: {
                size: 13
            }
        },
        traveller: {
            shape: 'icon',
            icon: {
                face: 'Analyst Desktop Icons',
                code: '\uE005',
                size: 40,
                color: '#f0a30a'
            },
            font: {
                size: 13,
                vadjust: 5
            }
        },
        assocTravellers: {
            shape: 'icon',
            icon: {
                face: 'Analyst Desktop Icons',
                code: '\uE005',
                size: 40,
                color: '#aa00ff'
            },
            font: {
                size: 13,
                vadjust: 5
            }
        }
    },
    layout: {
        hierarchical: {
            sortMethod: 'directed',
            direction: 'UD'
        }
    },
    edges: {
        smooth: true
    },
    physics: {
        stabilization: false
    }
};

interface IIATAssociatedTravellerGraphProps {
    model: IIATAssociatedTravellersGraphModel
}

class IATAssociatedTravellerGraph extends React.Component<IIATAssociatedTravellerGraphProps, any> {
    private _graphContainer : HTMLElement;
    _handleGraphContainerRef = (graphContainer : HTMLElement) => {
        this._graphContainer = graphContainer;
    };
    _draw = (container : HTMLElement) => {
        let nodes: any[] = this.props.model.nodes.map((node: any) => {
           return Object.assign({}, node, { margin: 10 });
        });

        let network = new vis.Network(container, { nodes: nodes, edges: this.props.model.edges }, graphOptions);
        network.once("afterDrawing", function() {
            network.fit({
                animation: {
                    duration: 500,
                    easingFunction: 'linear'
                }
            });
        });
    };
    componentDidMount() {
        if (this._graphContainer) {
            this._draw(this._graphContainer);
        }
    }
    render() {
        return (
            <div className="associated-traveller-graph" ref={this._handleGraphContainerRef}></div>
        );
    }
}

export{
    IATAssociatedTravellerGraph as default,
    IATAssociatedTravellerGraph
};
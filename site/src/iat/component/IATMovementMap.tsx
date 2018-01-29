import * as React from 'react';
import { Map } from 'react-arcgis';
import { esriPromise } from 'react-arcgis';
import * as AirportUtils from "../AirportUtils";
import * as StringUtils from "util/String";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IATFlightListStore from "../IATFlightListStore";
import IIATMovement from "../IIATMovement";

interface IIATMovementMapProps {
    masterEntity: IMasterEntityModel
    movementList: IMasterEntitySourceListModel<IIATMovement>;
}

export default class IATMovementMap extends React.Component<IIATMovementMapProps, any> {
    private _map;
    private _view;
    private _handleMapLoad = (map, view) => {
        this._map = map;
        this._view = view;
        esriPromise(['esri/Graphic',
                     'esri/geometry/Point',
                     'esri/geometry/Polyline',
                     'esri/symbols/SimpleLineSymbol',
                     'esri/Color',
                     'esri/geometry/geometryEngine',
                     'esri/layers/GraphicsLayer']).then(([ Graphic, Point, Polyline, SimpleLineSymbol, Color, geometryEngine, GraphicsLayer ]) => {
            const graphicsLayer = new GraphicsLayer();
            const graphics = [];
            const routes = {};
            this.props.movementList.items.forEach(movement => {
                let routeKey = `${movement.checkinPortCode}:${movement.localPortCode}`;
                let routeMovements = routes[routeKey];
                if (routeMovements) {
                    routeMovements.push(movement);
                } else {
                    routeMovements = [ movement ];
                    routes[routeKey] = routeMovements;
                }
            });
            Object.keys(routes).map(routeKey => {
                let routeMovements = routes[routeKey];
                let movement = routeMovements[0];
                const fromAirport = AirportUtils.GetAirportByCode(StringUtils.trim(movement.checkinPortCode));
                const toAirport = AirportUtils.GetAirportByCode(StringUtils.trim(movement.localPortCode));
                if (fromAirport && toAirport) {
                    const fromPoint = new Point(fromAirport.longitude, fromAirport.latitude);
                    const toPoint = new Point(toAirport.longitude, toAirport.latitude);
                    let line = new Polyline();
                    line.addPath([fromPoint, toPoint]);
                    line = geometryEngine.geodesicDensify(line, 10000);
                    const lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([226, 119, 40]),routeMovements.length + 1);
                    const routeAttr = {
                        title: `${movement.checkinPortCode} - ${movement.localPortCode}`,
                        movementsText: routeMovements.reduce((acc, cur) => `${acc} ${cur.routeId} ${cur.localScheduledDate} ${cur.directionCode}<br>`, ''),
                        movements: routeMovements,
                        numberOfMovements: routeMovements.length
                    };
                    const graphic = new Graphic({
                        geometry: line,
                        symbol: lineSymbol,
                        attributes: routeAttr,
                        popupTemplate: {
                            title: "{title}",
                            content: [{
                                type: "fields",
                                fieldInfos: [{
                                    fieldName: "numberOfMovements",
                                    label: "Number of Movements"
                                }, {
                                    fieldName: "movementsText",
                                    label: "Movements"
                                }]
                            }],
                            actions: [{
                                title: "Flight List",
                                id: "flightList",
                                className: "esri-icon-group"
                            }, {
                                title: "Associated Travellers",
                                id: "assocTravellers",
                                className: "esri-icon-group"
                            }]
                        }
                    });
                    graphics.push(graphic);
                }
            });
            graphicsLayer.addMany(graphics);
            this._map.add(graphicsLayer);
            this._view.popup.watch("selectedFeature", graphic =>{
                if(graphic){
                    let canShowAssoc = graphic.attributes.movements.length > 1;
                    graphic.popupTemplate.actions.items[0].visible = canShowAssoc;
                    graphic.popupTemplate.actions.items[1].visible = canShowAssoc;
                }
            });
            this._view.popup.on("trigger-action", event => {
                if (event.action.id === "flightList" || event.action.id === "assocTravellers") {
                    let movements = view.popup.selectedFeature.attributes.movements;
                    IATFlightListStore.loadForMovements(this.props.masterEntity, movements);
                    if (event.action.id === "flightList") {
                        IATFlightListStore.setVisible(true);
                    } else if (event.action.id === "assocTravellers") {
                        IATFlightListStore.associatedTravellersGraphModel.setVisible(true);
                    }
                }
            });
        }).catch((err) => console.error(err));
    };
    componentWillUnmount() {
        if (this._view) {
            this._view.graphics.removeAll();
        }
    }
    render() {
        return (
            <div>
               <Map style={{ width: '97vw', height: '75vh' }}
                    viewProperties={{
                      center: { latitude: -2.387713, longitude: 147.378118 },
                      zoom: 2
                    }}
                    onLoad={this._handleMapLoad} >
               </Map>
            </div>
        )
    }
}


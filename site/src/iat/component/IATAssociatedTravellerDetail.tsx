import * as React from "react";
import {
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IColumn,
    ColumnActionsMode,
    SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/Link";
import IIATAssociatedTraveller from "../IIATAssociatedTraveller";
import IIATAssociatedTravellersGraphModel from "../IIATAssociatedTravellersGraphModel";
import IIATMovement from "../IIATMovement";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import IMasterEntitySearchRequest from "entity/IMasterEntitySearchRequest";
import { movementToOutputText } from "../IATMovementHelper";
import { formatToNISName } from "entity/EntityNameUtils";
import { Column, ColumnType } from "util/ExcelWorkBook";
import IATAssociatedTravellerGraph from "./IATAssociatedTravellerGraph";
import "./IATAssociatedTravellerDetail.scss";
import * as DateUtils from "util/Date";

class IATAssociatedTravellerDetailColumn implements IColumn, Column {
    fieldName: string;
    label: string;
    key: string;
    ariaLabel: string;
    name: string;
    minWidth: number = 40;
    maxWidth: number = 80;
    isResizable: boolean = true;
    columnActionsMode: ColumnActionsMode = ColumnActionsMode.clickable;
    width: number = 100;
    excelIncludeColumn: boolean = true;
    type: ColumnType = ColumnType.STRING;
    constructor(fieldName: string, label: string) {
        this.fieldName = fieldName;
        this.label = label;
        this.key = fieldName;
        this.ariaLabel = label;
        this.name = label;
    }
}

const _getColumns = (onSearch: (request: IMasterEntitySearchRequest) => void) : IATAssociatedTravellerDetailColumn[] => {
    return [
        Object.assign(new IATAssociatedTravellerDetailColumn("nisName", "NIS Name"), {
            minWidth: 200,
            maxWidth: 250,
            excelIncludeColumn: false,
            onRender: (assocTraveller: IIATAssociatedTraveller) => {
                const nisName: string = formatToNISName(assocTraveller.familyName, assocTraveller.givenNames, null, NameGenderCdRef[assocTraveller.sexCode], assocTraveller.birthDate);
                if(onSearch) {
                    const _onLinkClick = (e) => {
                        e.stopPropagation();
                        onSearch({  fullName: `${assocTraveller.givenNames} ${assocTraveller.familyName}`, dob: assocTraveller.birthDate })
                    };
                    return <Link onClick={_onLinkClick}>{nisName}</Link>;
                }
                return nisName;
            }
        }),
        new IATAssociatedTravellerDetailColumn("givenNames", "Given Names"),
        new IATAssociatedTravellerDetailColumn("familyName", "Family Name"),
        Object.assign(new IATAssociatedTravellerDetailColumn("sexCode", "Gender"), {
            minWidth: 10,
            maxWidth: 40,
            onRender: (item: IIATAssociatedTraveller) => {
                return NameGenderCdRef[item.sexCode];
            },
            onRenderExcel:  (item: IIATAssociatedTraveller) => {
                return NameGenderCdRef[item.sexCode];
            }
        }),
        Object.assign(new IATAssociatedTravellerDetailColumn("birthDate", "Date of Birth"), {
            type: ColumnType.DATE,
            onRender: (assocTraveller: IIATAssociatedTraveller) => {
                return DateUtils.dataToOutputText(assocTraveller.birthDate);
            }
        }),
        new IATAssociatedTravellerDetailColumn("travelDocumentId", "Passport"),
        new IATAssociatedTravellerDetailColumn("travelDocCountryCode", "Passport Country"),
        new IATAssociatedTravellerDetailColumn("movementRaceID", "Race ID"),
        Object.assign(new IATAssociatedTravellerDetailColumn("movements", "Movements"), {
            minWidth: 200,
            maxWidth: 250,
            width: 250,
            onRender: (assocTraveller: IIATAssociatedTraveller) => {
                if (assocTraveller.movements) {
                    return assocTraveller.movements.map((movement: IIATMovement, idx: number) => {
                        return <span className="associated-traveller-movement"
                                     key={idx}>{movementToOutputText(movement)}</span>;
                    });
                }
            },
            onRenderExcel: (assocTraveller : IIATAssociatedTraveller) => {
                if (assocTraveller.movements) {
                    let movements: string[] = assocTraveller.movements.map((movement: IIATMovement) => {
                        return movementToOutputText(movement);
                    });
                    return movements.join();
                }
                return null;
            }
        })
    ] as IATAssociatedTravellerDetailColumn[];
};

interface IIATAssociatedTravellerDetailProps {
    list : IIATAssociatedTraveller[];
    graphModel: IIATAssociatedTravellersGraphModel
    onSearch?: (request: IMasterEntitySearchRequest) => void;
}

class IATAssociatedTravellerDetail extends React.Component<IIATAssociatedTravellerDetailProps, any> {
    private _columns: IColumn[];
    constructor(props: IIATAssociatedTravellerDetailProps) {
        super(props);
        this._columns = _getColumns(this.props.onSearch);
    }
    render() {
        return (
            <div>
                <DetailsList className="associated-traveller-detail"
                             columns={this._columns}
                             items={this.props.list}
                             selectionMode={SelectionMode.single}
                             layoutMode={DetailsListLayoutMode.fixedColumns}
                             constrainMode={ConstrainMode.unconstrained}
                             checkboxVisibility={CheckboxVisibility.hidden} />
                <IATAssociatedTravellerGraph  model={ this.props.graphModel } />
            </div>
        );
    }
}

export{ IATAssociatedTravellerDetail as default, IATAssociatedTravellerDetail, IIATAssociatedTravellerDetailProps, IATAssociatedTravellerDetailColumn, _getColumns as getIATAssociatedTravellerDetailColumns };
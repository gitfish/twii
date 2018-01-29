import * as React from "react";
import { observer } from "mobx-react";
import {
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IColumn,
    ColumnActionsMode,
    SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Link } from "office-ui-fabric-react/lib/Link";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as DateUtils from "util/Date";
import { formatToNISName } from "entity/EntityNameUtils";
import Error from "common/component/Error";
import { Output as DateOutputFormats } from "common/DateFormats";
import SourceSystemCdRef from "refdata/SourceSystemCd";
import IIATMovement from "../IIATMovement";
import "./IATMovementDetails.scss";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySearchRequest from "entity/IMasterEntitySearchRequest";
import IIATFlightListModel from "../IIATFlightListModel";
import { IATAssociatedTravellerDetail, getIATAssociatedTravellerDetailColumns } from "./IATAssociatedTravellerDetail";
import IIATAssociatedTraveller from "../IIATAssociatedTraveller";
import IIATFlightListItem from "../IIATFlightListItem";
import * as moment from "moment";
import { movementToKey, movementToOutputText } from "../IATMovementHelper";
import { ExcelWorkBook, WorkBookProps, Column, ColumnType } from "util/ExcelWorkBook";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";

class IATFlightListColumn implements IColumn, Column {
    fieldName: string;
    label: string;
    key: string;
    ariaLabel: string;
    name: string;
    minWidth: number = 50;
    maxWidth: number = 100;
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

const _getColumns = (listModel: IIATFlightListModel, masterEntity: IMasterEntityModel, onSearch?: (request : IMasterEntitySearchRequest) => void) : IATFlightListColumn[] => {
    return [
        Object.assign(new IATFlightListColumn("nisName", "NIS Name"), {
            minWidth: 200,
            maxWidth: 250,
            excelIncludeColumn: false,
            onRender: (item: IIATFlightListItem) => {
                const nisName: string = formatToNISName(item.familyName, item.givenNames, null, NameGenderCdRef[item.sexCode], item.birthDate);
                if(onSearch) {
                    const _onLinkClick = (e) => {
                        e.stopPropagation();
                        onSearch({ fullName: `${item.givenNames} ${item.familyName}`, dob: item.birthDate });
                        listModel.setVisible(false);
                    };
                    return <Link onClick={_onLinkClick}>{nisName}</Link>;
                }
                return nisName;
            }
        }),
        new IATFlightListColumn("travelDocumentId", "Passport"),
        new IATFlightListColumn("travelDocCountryCode", "Passport Country"),
        new IATFlightListColumn("birthDeptCountryCode", "Birth Country"),
        new IATFlightListColumn("aliasSequenceNbr", "Alias Sequence Number"),
        new IATFlightListColumn("givenNames", "Given Names"),
        new IATFlightListColumn("familyName", "Family Name"),
        Object.assign(new IATFlightListColumn("sexCode", "Gender"), {
            minWidth: 10,
            maxWidth: 40,
            onRender: (item: IIATFlightListItem) => {
                return NameGenderCdRef[item.sexCode];
            },
            onRenderExcel:  (item: IIATFlightListItem) => {
                return NameGenderCdRef[item.sexCode];
            }
        }),
        Object.assign(new IATFlightListColumn("birthDate", "Date of Birth"), {
            type: ColumnType.DATE,
            onRender: (item: IIATFlightListItem) => {
                return DateUtils.dataToOutputText(item.birthDate);
            }
        }),
        new IATFlightListColumn("actualMovementMessageID", "Actual Movement Message ID"),
        Object.assign(new IATFlightListColumn("expectedMovementMessageID", "Expected Movement Message ID"), {
            minWidth: 125,
            maxWidth: 125
        }),
        new IATFlightListColumn("expectedMovementNbr", "Expected Movement Number"),
        new IATFlightListColumn("movementStatusCode", "Movement Status Code"),
        new IATFlightListColumn("movementTime", "Movement Time"),
        new IATFlightListColumn("movementHistoryInd", "Movement History Ind"),
        new IATFlightListColumn("visaIdentifyingNBR", "Visa Identifying Number"),
        new IATFlightListColumn("visaID", "Visa ID"),
        new IATFlightListColumn("visaSubClassCode", "Visa SubClass Code"),
        Object.assign(new IATFlightListColumn("visaGrantDate", "Visa Grant Date"), {
            type: ColumnType.DATE,
            onRender: (item: IIATFlightListItem) => {
                return DateUtils.dataToOutputText(item.visaGrantDate);
            }
        }),
        new IATFlightListColumn("passengerCrewCode", "Passenger Crew Code"),
        new IATFlightListColumn("postMovementInd", "Post Movement Ind"),
        new IATFlightListColumn("bagsExamReferralReasonCode", "BAGS Exam Referral Reason Code"),
        new IATFlightListColumn("travelDocSequenceNbr", "Travel Doc Sequence Number"),
        Object.assign(new IATFlightListColumn("sourceSystemCode", "Sourced From"), {
            onRender: (item: IIATFlightListItem) => {
                return SourceSystemCdRef.getDesc(item.sourceSystemCode);
            },
            onRenderExcel:  (item: IIATFlightListItem) => {
                return SourceSystemCdRef.getDesc(item.sourceSystemCode);
            }
        }),
        new IATFlightListColumn("travellerMovementTypeCode", "Traveller Movement Type Code"),
        new IATFlightListColumn("alertInd", "Alert Indicator"),
        new IATFlightListColumn("movementRaceID", "Race ID"),
        new IATFlightListColumn("userID", "User ID"),
        new IATFlightListColumn("numberOfExamsForTheTraveller", "Number of Exams For The Traveller"),
        new IATFlightListColumn("positiveFindCountForTraveller", "Positive Find Count For Traveller"),
        new IATFlightListColumn("examinationForTravellerInd", "Examination For Traveller Ind"),
        new IATFlightListColumn("positiveFindForTravellerInd", "Positive Find For Traveller Ind")
    ] as IATFlightListColumn[];
}

interface IIATFlightListDetailProps {
    columns: IColumn[];
    items: IIATFlightListItem[];
}

class IATFlightListDetail extends React.Component<IIATFlightListDetailProps, any> {
    render() {
        return (
            <DetailsList columns={this.props.columns}
                         items={this.props.items}
                         selectionMode={SelectionMode.single}
                         layoutMode={DetailsListLayoutMode.fixedColumns}
                         constrainMode={ConstrainMode.unconstrained}
                         checkboxVisibility = {CheckboxVisibility.hidden} />
        );
    }
}

const IATFlightListViewPrefsStore = new ViewPreferencesModel("iatFlightList");

interface IIATFlightListProps {
    model: IIATFlightListModel;
    masterEntity: IMasterEntityModel;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

@observer
class IATFlightList extends React.Component<IIATFlightListProps, any> {
    private _downloadXlsxLinkRef : any;
    private _columns: IATFlightListColumn[];
    constructor(props: IIATFlightListProps) {
        super(props);
        this._columns = _getColumns(this.props.model, this.props.masterEntity, this.props.onSearch ? this._onSearch : undefined)
    }
    _getVisibleColumns = () => {
        return this._columns.filter((column: IATFlightListColumn) => IATFlightListViewPrefsStore.isFieldVisible(column.key));
    };
    _cleanupDownloadBlobRef = () => {
        if(this._downloadXlsxLinkRef && this._downloadXlsxLinkRef.href) {
            try {
                URL.revokeObjectURL(this._downloadXlsxLinkRef.href);
            } catch(e) {}
        }
    };
    _downloadXlsxButtonClick = () => {
        let workbookProps: WorkBookProps = {
            Title: "Flight List",
            Subject: "Flight List",
            Author: "Analyst Desktop",
            Company: "DIBP",
            CreatedDate: new Date()
        };
        let columns: Column[] = this._getVisibleColumns().filter(col => col.excelIncludeColumn);
        let workbook: ExcelWorkBook = new ExcelWorkBook(workbookProps);
        this.props.model.movements.forEach((movement: IIATMovement) => {
            let sheetName = movementToKey(movement);
            let items : IIATFlightListItem[] = this.props.model.getItems(movement);
            workbook.addSheet(sheetName, columns, items);
        });
        if (this.props.model.associatedTravellers && this.props.model.associatedTravellers.length > 0) {
            let columns: Column[] = getIATAssociatedTravellerDetailColumns(undefined).filter(col => col.excelIncludeColumn);
            let items: IIATAssociatedTraveller[] = this.props.model.associatedTravellers;
            workbook.addSheet("Associated Travellers", columns, items);
        }

        let blob: Blob = workbook.write();
        let fts = moment(this.props.model.sync.endDate).format(DateOutputFormats.filename);
        let fname = `FlightList-${fts}.xlsx`;
        if(window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fname);
        } else if(this._downloadXlsxLinkRef) {
            this._cleanupDownloadBlobRef();
            let url = URL.createObjectURL(blob);
            this._downloadXlsxLinkRef.href = url;
            this._downloadXlsxLinkRef.download = fname;
            this._downloadXlsxLinkRef.click();
        }
    };
    _handleXlsxDownloadLinkClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    };
    _handleXlsxDownloadLinkRef = (ref) => {
        this._downloadXlsxLinkRef = ref;
    };
    private _onSearch = (request : IMasterEntitySearchRequest) => {
        if(this.props.onSearch) {
            this.props.onSearch(request);
            this.props.model.setVisible(false);
        }
    }
    render() {
        let visibleColumns = this._getVisibleColumns();
        let pivotItems = this.props.model.movements.map((movement: IIATMovement, idx: number) => {
             return (
                <PivotItem linkText={movementToOutputText(movement)} key={String(idx)}>
                    <IATFlightListDetail columns={visibleColumns}
                                            items={this.props.model.getItems(movement)}/>
                </PivotItem>
             );
        });
        if(this.props.model.associatedTravellers && this.props.model.associatedTravellers.length > 0) {
            pivotItems.push(
                <PivotItem linkText={'Associated Travellers'} key={'assocTravellers'}>
                    <IATAssociatedTravellerDetail list={this.props.model.associatedTravellers}
                                                graphModel={this.props.model.associatedTravellersGraphModel}
                                                onSearch={this.props.onSearch ? this._onSearch : undefined}/>
                </PivotItem>
            );
        }
        const content = <Pivot>
                        {pivotItems}
                    </Pivot>
        
        let downloadXlsxButton: IContextualMenuItem = {
            key: 'downloadXlsx',
            iconProps:{iconName: 'ExcelLogo16'},
            name:"Download",
            onClick:this._downloadXlsxButtonClick
        };
        let menuItems = [
            downloadXlsxButton,
            createViewPreferencesMenuItem(IATFlightListViewPrefsStore, this._columns)
        ];
        let commandBar = <CommandBar isSearchBoxVisible={ false } elipisisAriaLabel='More options' items={[]} farItems={ menuItems }/>
        const downloadXlsxLinkRef = <a href="#" hidden={true} ref={this._handleXlsxDownloadLinkRef} onClick={this._handleXlsxDownloadLinkClick}>Download Xlsx</a>;
        return (
            <div className="iat-flight-list">
                {commandBar}
                {content}
                {downloadXlsxLinkRef}
            </div>
        );
    }
}

class IATFlightListContainer extends React.Component<IIATFlightListProps, any> {
    private _onRenderDone = () => {
        return <IATFlightList {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} onRenderDone={this._onRenderDone} />;
    }
}

@observer
class IATFlightListPanel extends React.Component<IIATFlightListProps, any> {
    private _onPanelDismiss = () => {
        this.props.model.setVisible(false);
    };
    render() {
        return (
            <Panel isOpen={true} isLightDismiss={true} type={ PanelType.custom }
                   customWidth='800px' headerText='Flight List' onDismiss={this._onPanelDismiss}>
                <IATFlightListContainer {...this.props} />
            </Panel>
        );
    }
}

export{ IATFlightListPanel as default, IATFlightListPanel, IIATFlightListProps };

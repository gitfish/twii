
import * as React from 'react';
import { observer } from "mobx-react";
import { Details } from "common/component/Details";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as Icons from "icon/AnalystDesktopIcons";
import "./GroupInfo.scss";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import {MEDetailsAttribute} from "me/component/common/MEDetailsAttribute";
import Error from "common/component/Error";
import IMESummaryModel from "me/summary/IMESummaryModel";

interface IGroupInfoProps {
    model?: IMESummaryModel;
}

const GroupInfoFields = [
    {
        key: "TravellerCount",
        name: "Traveller Count",
        headerClassName:"group-info-list-header",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                           value={source.BookingSummaryInfo ? source.BookingSummaryInfo.TravellerCount? source.BookingSummaryInfo.TravellerCount: "-": "-"}/>;

        }
    },
    {
        key: "TCPNumber",
        name: "TCP",
        headerClassName:"group-info-list-header",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                           value={source.BookingSummaryInfo ? source.BookingSummaryInfo.TCPNumber? source.BookingSummaryInfo.TCPNumber : "-": "-"}/>;
        }
    },
    {
        key: "MinorsInGroupCount",
        name: "Minors in Group",
        headerClassName:"group-info-list-header",
        onRender: (source: any, field: any) => {
           // return <GroupInfoItemAttribute key={field.key} label={field.name} value={source.BookingSummaryInfo ? source.BookingSummaryInfo.MinorsInGroupCount : "-"}/>;
            return <MEDetailsAttribute label={field.name}
                                           value={source.BookingSummaryInfo ? source.BookingSummaryInfo.MinorsInGroupCount? source.BookingSummaryInfo.MinorsInGroupCount : "-": "-"}/>;
        }
    },
    {
        key: "TravelGroupName",
        name: "Group Name",
        headerClassName:"group-info-list-header",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                           value={source.BookingSummaryInfo ? source.BookingSummaryInfo.TravelGroupName? source.BookingSummaryInfo.TravelGroupName : "-" : "-"}/>;
        }
    }
];

@observer
class GroupInfo extends React.Component<IGroupInfoProps, any> {

    render() {

        let content: any = <div> No data available to display </div>;

        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            if (this.props.model.bookingSummary!=null && this.props.model.bookingSummary!=undefined) {
                content = GroupInfoFields.map((field: any) => {
                    if (field.onRender) {
                        return field.onRender(this.props.model.bookingSummary, field);
                    }
                });
            }
        }
        return (
            <Details className={css("group-info", "me-section")}
                     summary={<div>{<Icons.BOOKINGS/>} Group Information </div>}
                     open={true}
                     controlOnHeaderClick={true}
                     headerClassName={css("group-info-ribbon")}>
                <div className="me-group-info">
                    {content}
                </div>
            </Details>
        );
    }
}


export {GroupInfo as default, GroupInfo}

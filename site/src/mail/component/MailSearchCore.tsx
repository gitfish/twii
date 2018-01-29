import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { SearchCoreContainer, ISearchCoreContainerProps } from "search/component/SearchCoreContainer";
import SearchCoreDetailListView from "search/component/SearchCoreDetailListView";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";

const Columns : IColumn[] = [
    {
        key: "DESCRIPTION",
        name: "Description",
        fieldName: "DESCRIPTION",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "ORIGIN_COUNTRY_CODE",
        name: "Origin Country Code",
        fieldName: "ORIGIN_COUNTRY_CODE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "POSTING_DATE",
        name: "Posting Date",
        fieldName: "POSTING_DATE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "MAIL_CLASS",
        name: "Mail Class",
        fieldName: "MAIL_CLASS",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "FORM_TYPE",
        name: "Form Type",
        fieldName: "FORM_TYPE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "GROSS_WEIGHT",
        name: "Gross Weight",
        fieldName: "GROSS_WEIGHT",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "DECLARED_VALUE",
        name: "Declared Value",
        fieldName: "DECLARED_VALUE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "SENDER_NAME",
        name: "Sender Name",
        fieldName: "SENDER_NAME",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "SENDER_ADDR_LN1",
        name: "Sender Address Line 1",
        fieldName: "SENDER_ADDR_LN1",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "SENDER_ADDR_LN2",
        name: "Sender Address Line 2",
        fieldName: "SENDER_ADDR_LN2",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "SENDER_ADDR_LN3",
        name: "Sender Address Line 3",
        fieldName: "SENDER_ADDR_LN3",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "SENDER_LOC_CODE",
        name: "Sender Location Code",
        fieldName: "SENDER_LOC_CODE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "SENDER_LOC_NAME",
        name: "Sender Location Name",
        fieldName: "SENDER_LOC_NAME",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "DESTINATION_COUNTRY_CODE",
        name: "Destination Country Code",
        fieldName: "DESTINATION_COUNTRY_CODE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "REC_NAME",
        name: "Recipient Name",
        fieldName: "REC_NAME",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "REC_ADDR_LN1",
        name: "Recipient Address Line 1",
        fieldName: "REC_ADDR_LN1",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "REC_ADDR_LN2",
        name: "Recipient Address Line 2",
        fieldName: "REC_ADDR_LN2",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "REC_ADDR_LN3",
        name: "Recipient Address Line 3",
        fieldName: "REC_ADDR_LN3",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "REC_LOC_CODE",
        name: "Recipient Location Code",
        fieldName: "REC_LOC_CODE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "REC_LOC_NAME",
        name: "Recipient Location Name",
        fieldName: "REC_LOC_NAME",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "TELEPHONE",
        name: "Telephone",
        fieldName: "TELEPHONE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "VALUE_1",
        name: "Value 1",
        fieldName: "VALUE_1",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    }
];

class MailSearchCore extends React.Component<ISearchCoreContainerProps, any> {
    _handleRenderResult = (core) => {
        return <SearchCoreDetailListView core={core} columns={Columns} />;
    }
    render() {
        return <SearchCoreContainer core={this.props.core} onRender={this._handleRenderResult} />;
    }
}

export {
    MailSearchCore as default,
    MailSearchCore
}
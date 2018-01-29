import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

const getColumnText = (item : any, column : IColumn) : string => {
    let cellValue : string;
    if(column.data && column.data.getText) {
        cellValue = column.data.getText(item);
    } else {
        cellValue = item[column.fieldName];
    }
    return cellValue ? String(cellValue) : "";
};

const getRowText = (item : any, columns : IColumn[]) : string[] => {
    const row : string[] = [];
    columns.forEach((c) => {
        row.push(getColumnText(item, c));
    });
    return row;
};

const getRowCSV = (item: any, columns : IColumn[]) : string => {
    return getRowText(item, columns).join(",");
};

const getCSV = (items : any[], columns : IColumn[], includeHeader : boolean = true) : string => {
    let r = "";
    if(includeHeader) {
        r += columns.map(c => c.name).join(",") + "\r\n";
    }
    if(items && items.length > 0) {
        items.forEach((item) => {
            r += getRowCSV(item, columns) + "\r\n";
        });
    }
    return r;
};

export { getRowText, getRowCSV, getCSV, getColumnText }
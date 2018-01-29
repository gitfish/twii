import * as XLSX from "xlsx";
import { momentFromDataText } from "util/Date";
import * as moment from "moment";

type WorkBookProps = XLSX.FullProperties;
const DEFAULT_COLUMN_WIDTH = 100;
const DATE_FORMAT = 'dd/mm/yyyy';

enum ColumnType {
    STRING,
    NUMBER,
    BOOLEAN,
    DATE
}

interface Column {
    fieldName: string;
    label: string;
    width?: number;
    type?: ColumnType
    onRenderExcel?: (item?: any) => any;
}

class ExcelWorkBook {

    private wb: XLSX.WorkBook = { SheetNames: [], Sheets: {} };

    public constructor(props: WorkBookProps) {
        this.wb.Props = props;
    }

    public addSheet(sheetName: string, columns: Column[], rowObjs: any[]) {
        let cell, ws = ({});
        let range = ({s: {c:0, r:0}, e: {c:0, r:rowObjs.length}});
        let hdr = columns.map(column => column.label);
        for(let R = 0; R != rowObjs.length; ++R) {
            columns.forEach(function(k, i) {
                var rowObj = rowObjs[R];
                var v = (k.onRenderExcel ? k.onRenderExcel(rowObj) : rowObj[k.fieldName]);
                var t = 'z', z = "";
                if(!k.type || k.type as ColumnType === ColumnType.STRING) t = 's';
                else if(k.type === ColumnType.NUMBER) t = 'n';
                else if(k.type === ColumnType.BOOLEAN) t = 'b';
                else if(k.type === ColumnType.DATE) {
                    let md: moment.Moment = momentFromDataText(v);
                    if (md && md.isValid()) {
                        t = 'd';
                        v = md.utc(true).toDate(); // Excel has no concept of a timezone, everything has to be UTC
                        z = DATE_FORMAT;
                    }
                }
                ws[XLSX.utils.encode_cell({c:i,r:R+1})] = cell = ({t:t, v:v});
                if(z) cell.z = z;
            });
        }
        range.e.c = hdr.length - 1;
        for(let C = 0; C < hdr.length; ++C) ws[XLSX.utils.encode_col(C) + "1"] = {t:'s', v:hdr[C]};
        ws['!cols'] = columns.map((column) => { return {wpx: column.width || DEFAULT_COLUMN_WIDTH} });
        ws['!ref'] = XLSX.utils.encode_range(range);
        this.wb.SheetNames.push(sheetName);
        this.wb.Sheets[sheetName] = ws;
    }

    public write() : Blob {
        let wbOut = XLSX.write(this.wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});
        return new Blob([this.writeToBuffer(wbOut)], {type: "application/octet-stream"})
    }

    private writeToBuffer(s) : ArrayBuffer | Array<number> {
        if(typeof ArrayBuffer !== 'undefined') {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i = 0; i != s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        } else {
            let buf = new Array(s.length);
            for (let i = 0; i != s.length; ++i) {
                buf[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
    };
}

export { ExcelWorkBook as default, ExcelWorkBook, WorkBookProps, Column, ColumnType };
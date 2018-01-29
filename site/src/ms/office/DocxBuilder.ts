import IXmlActions from "xml/IXmlActions";
import ElementBuilder from "xml/ElementBuilder";

interface IBaseProps {
    bold?: boolean;
    italic?: boolean;
}

interface IParagraphProps extends IBaseProps {
    justification?: string;
    adjustRightInd?: boolean;
    autoSpaceDE?: boolean;
    autoSpaceDN?: boolean;
}

interface IRunProps extends IBaseProps {
    complexScriptBold?: boolean;
    bidirectionalOverride?: string;
    color?: string;
    size?: string;
}

interface ITyped {
    type?: string;
}

interface ITableWidth extends ITyped {
    w?: string;
}

interface ITableBorder {
    val?: string;
    size?: string;
    space?: string;
    color?: string;
    themeColor?: string;
}

interface ITableBorders {
    top?: ITableBorder;
    start?: ITableBorder;
    bottom?: ITableBorder;
    end?: ITableBorder;
    insideH?: ITableBorder;
    insideV?: ITableBorder;
}

interface ITableProps {
    preferredWidth?: ITableWidth;
    layout?: string;
    borders?: ITableBorders;
    look?: ITableLookProps;
    style?: string;
}

interface ITableRowHeight {
    val: string;
    hRule: string;
}

interface ITableRowProps {
    trHeight: ITableRowHeight;
    tableExceptions: ITableProps;
}

interface ITableCellBorders {
    top?: ITableBorder;
    start?: ITableBorder;
    bottom?: ITableBorder;
    end?: ITableBorder;
}

interface ITableCellMargins {
    top?: ITableWidth;
    start?: ITableWidth;
    bottom?: ITableWidth;
    end?: ITableWidth;
}

interface IShadingProps {
    val?: string;
    color?: string;
    fill?: string;
    themeColor?: string;
    themeFill?: string;
    themeFillShade?: string;
    themeFillTint?: string;
    themeShade?: string;
    themeTint?: string;
}

interface ITableCellProps {
    id?: string;
    preferredWidth?: ITableWidth;
    margins?: ITableCellMargins;
    textDirection?: string;
    shading?: IShadingProps;
    borders?: ITableCellBorders;
    fitText?: boolean;
    vMerge?: string;
    hMerge?: string;
    vAlign?: string;
    hAlign?: string;
}

interface ITableLookProps {
    firstColumn?: boolean;
    firstRow?: boolean;
    lastColumn?: boolean;
    lastRow?: boolean;
    noHBand?: boolean;
    noVBand?: boolean;
}

interface IContentHandler {
    (context : DocxBuilder) : void;
}

const mainNamespace = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

class DocxBuilder {
    private _a = new ElementBuilder();
    constructor() {
        const prefixMap = {};
        prefixMap[mainNamespace] = "w";
    }
    private _startElement(name : string) {
        this._a.startElement({ prefix: "w", namespaceURI: mainNamespace, name: name });
    }
    private _startEndElement(name : string) {
        this._startElement(name);
        this._endElement();
    }
    private _attr(name : string, value : string) {
        if(value !== undefined) {
            this._a.attribute({ prefix: "w", namespaceURI: mainNamespace, name: name, value: value });
        }
    }
    private _valAttr(value : string) {
        this._attr("val", value);
    }
    private _valElement(name : string, value : string) {
        if(value !== undefined) {
            this._startElement(name);
            this._valAttr(value);
            this._endElement();
        }
    }
    private _toggleValElement(name : string, value?: boolean) {
        if(value !== undefined) {
            this._valElement(name, value ? "true" : "false");
        }
    }
    private _paragraphProps(props : IParagraphProps) {
        this._startElement("pPr");
        this._baseProps(props);
        this._valElement("jc", props.justification);
        this._toggleValElement("adjustRightInd", props.adjustRightInd);
        this._toggleValElement("autoSpaceDE", props.autoSpaceDE);
        this._toggleValElement("autoSpaceDN", props.autoSpaceDN);
        this._endElement();
        return this;
    }
    startDocument() {
        this._startElement("document");
    }
    endDocument() {
        this._endElement();
    }
    startParagraph(props?: IParagraphProps) {
        this._startElement("p");
        if(props) {
            this._paragraphProps(props);
        }
        return this;
    }
    endParagraph() {
        this._endElement();
        return this;
    }
    pEnd() {
        return this.endParagraph();
    }
    paragraph(props?: IParagraphProps, contentHandler?: IContentHandler) {
        this.startParagraph(props);
        if(contentHandler) {
            contentHandler(this);
            this.endParagraph();
        }
        return this;
    }
    p(props?: IParagraphProps, contentHandler?: IContentHandler) {
        return this.paragraph(props, contentHandler);
    }
    private _baseProps(props : IBaseProps) {
        this._toggleValElement("b", props.bold);
        this._toggleValElement("i", props.italic);
    }
    private _runProps(props : IRunProps) {
        this._startElement("rPr");
        this._baseProps(props);
        this._toggleValElement("bCs", props.complexScriptBold);
        if(props.bidirectionalOverride) {
            this._valElement("bdo", props.bidirectionalOverride);
        }
        if(props.color) {
            this._valElement("color", props.color);
        }
        if(props.size !== undefined) {
            this._valElement("sz", String(props.size));
        }
        this._endElement();
    }
    startRun(props?: IRunProps) {
        this._startElement("r");
        if(props) {
            this._runProps(props);
        }
        return this;
    }
    endRun() {
        this._endElement();
        return this;
    }
    rEnd() {
        return this.endRun();
    }
    run(props?: IRunProps, contentHandler?: IContentHandler) {
        this.startRun(props);
        if(contentHandler) {
            contentHandler(this);
            this.endRun();
        }
        return this;
    }
    r(props?: IRunProps, contentHandler?: IContentHandler) {
        return this.run(props, contentHandler);
    }
    text(value : string) {
        this._startElement("t");
        this._a.attribute({ prefix: "xml", name: "space", value: "preserve" });
        this._a.text(value);
        this._endElement();
        return this;
    }
    private _tableWidth(name : string, value : ITableWidth) {
        if(value && (value.type || value.w)) {
            this._startElement(name);
            this._attr("type", value.type);
            this._attr("w", value.w);
            this._endElement();
        }
    }
    private _typed(name : string, value : ITyped) {
        if(value && value.type) {
            this._startElement(name);
            this._attr("type", value.type);
            this._endElement();
        }
    }
    private _tableBorder(name : string, tableBorder : ITableBorder) {
        if(tableBorder) {
            this._startElement(name);
            this._valAttr(tableBorder.val);
            this._attr("sz", tableBorder.size);
            this._attr("space", tableBorder.space);
            this._attr("color", tableBorder.color);
            this._attr("themeColor", tableBorder.themeColor);
            this._endElement();
        }
    }
    private _tableBorders(tableBorders : ITableBorders) {
        if(tableBorders) {
            this._startElement("tblBorders");
            this._tableBorder("top", tableBorders.top);
            this._tableBorder("start", tableBorders.start);
            this._tableBorder("bottom", tableBorders.bottom);
            this._tableBorder("end", tableBorders.end);
            this._tableBorder("insideH", tableBorders.insideH);
            this._tableBorder("insideV", tableBorders.insideV);
            this._endElement();
        }
    }
    private _tableLayout(layout : string) {
        if(layout) {
            this._startElement("tblLayout");
            this._attr("type", layout);
            this._endElement();
        }
    }
    private _tableLook(props : ITableLookProps) {
        if(props) {
            this._startElement("tblLook");
            this._toggleValElement("firstColumn", props.firstColumn);
            this._toggleValElement("firstRow", props.firstRow);
            this._toggleValElement("lastColumn", props.lastColumn);
            this._toggleValElement("lastRow", props.lastRow);
            this._toggleValElement("noHBand", props.noHBand);
            this._toggleValElement("noVBand", props.noVBand);
            this._endElement();
        }
    }
    private _tableProps(name: string, props : ITableProps) {
        this._startElement(name);
        this._tableWidth("tblW", props.preferredWidth);
        this._tableLayout(props.layout);
        this._tableBorders(props.borders);
        this._tableLook(props.look);
        this._valElement("tblStyle", props.style);
        this._endElement();
    }
    startTable(props?: ITableProps) {
        this._startElement("tbl");
        if(props) {
            this._tableProps("tblPr", props);
        }
        return this;
    }
    table(props?: ITableProps, contentHandler?: IContentHandler) {
        this.startTable(props);
        if(contentHandler) {
            contentHandler(this);
            this.endTable();
        }
        return this;
    }
    tbl(props?: ITableProps, contentHandler?: IContentHandler) {
        return this.table(props, contentHandler);
    }
    private _tableRowHeight(props : ITableRowHeight) {
        if(props) {
            this._startElement("trHeight");
            this._valAttr(props.val);
            this._attr("hRule", props.hRule);
            this._endElement();
        }
    }
    private _tableRowProps(props : ITableRowProps) {
        this._startElement("trPr");
        this._tableRowHeight(props.trHeight);
        this._endElement();
    }
    startTableRow(props?: ITableRowProps) {
        this._startElement("tr");
        if(props) {
            this._tableRowProps(props);
        }
        if(props && props.tableExceptions) {
            this._tableProps("tblPrEx", props.tableExceptions);
        }
        return this;
    }
    tableRow(props?: ITableRowProps, contentHandler?: IContentHandler) {
        this.startTableRow(props);
        if(contentHandler) {
            contentHandler(this);
            this.endTableRow();
        }
        return this;
    }
    tr(props?: ITableRowProps, contentHandler?: IContentHandler) {
        return this.tableRow(props, contentHandler);
    }
    private _shadingProps(name: string, props : IShadingProps) {
        if(props) {
            this._startElement(name);
            this._valAttr(props.val);
            this._attr("color", props.color);
            this._attr("fill", props.fill);
            this._attr("themeColor", props.themeColor);
            this._attr("themeFill", props.themeFill);
            this._attr("themeFillShade", props.themeFillShade);
            this._attr("themeFillTint", props.themeFillTint);
            this._attr("themeShade", props.themeShade);
            this._attr("themeTint", props.themeTint);
            this._endElement();
        }
    }
    private _tableCellMargins(props : ITableCellMargins) {
        if(props) {
            this._startElement("tcMar");
            this._tableWidth("top", props.top);
            this._tableWidth("start", props.start);
            this._tableWidth("bottom", props.bottom);
            this._tableWidth("end", props.end);
            this._endElement();
        }
    }
    private _tableCellBorders(borders : ITableCellBorders) {
        if(borders) {
            this._startElement("tcBorders");
            this._tableBorder("top", borders.top);
            this._tableBorder("start", borders.start);
            this._tableBorder("bottom", borders.bottom);
            this._tableBorder("end", borders.end);
            this._endElement();
        }
    }
    private _tableCellProps(props : ITableCellProps) {
        this._startElement("tcPr");
        this._attr("id", props.id);
        this._tableWidth("tcW", props.preferredWidth);
        this._tableCellMargins(props.margins);
        this._valElement("textDirection", props.textDirection);
        this._shadingProps("shd", props.shading);
        this._toggleValElement("tcFitText", props.fitText);
        this._tableCellBorders(props.borders);
        this._valElement("vMerge", props.vMerge);
        this._valElement("hMerge", props.hMerge);
        this._valElement("vAlign", props.vAlign);
        this._valElement("hAlign", props.hAlign);
        this._endElement();
    }
    startTableCell(props?: ITableCellProps) {
        this._startElement("tc");
        if(props) {
            this._tableCellProps(props);
        }
        return this;
    }
    tableCell(props?: ITableCellProps, contentHandler?: IContentHandler) {
        this.startTableCell(props);
        if(contentHandler) {
            contentHandler(this);
            this.endTableCell();
        }
        return this;
    }
    tc(props?: ITableCellProps, contentHandler?: IContentHandler) {
        return this.tableCell(props, contentHandler);
    }
    endTableCell() {
        this._endElement();
        return this;
    }
    tcEnd() {
        return this.endTableCell();
    }
    endTableRow() {
        this._endElement();
        return this;
    }
    trEnd() {
        return this.endTableRow();
    }
    endTable() {
        this._endElement();
        return this;
    }
    tblEnd() {
        return this.endTable();
    }
    private _endElement() {
        this._a.endElement();
    }
    get result() {
        return this._a.result;
    }
}

export { DocxBuilder as default, DocxBuilder }


import * as ColumnTextHelper from "./ColumnTextHelper";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

describe("Column Text Helper", () => {
    test("all()", () => {
        const columns : IColumn[] = [
            {
                key: "firstName",
                fieldName: "firstName",
                name: "First Name",
                minWidth: 50
            },
            {
                key: "lastName",
                fieldName: "lastName",
                name: "Last Name",
                minWidth: 50
            },
            {
                key: "poo",
                fieldName: "poo",
                name: "Poo",
                minWidth: 50,
                data: {
                    getText(item) {
                        return `Poo ${item.poo}`;
                    }
                }
            }
        ];

        const item = {
            firstName: "Gone",
            lastName: "Gowings",
            poo: "to"
        };

        const textRow = ColumnTextHelper.getRowText(item, columns);

        expect(textRow[0]).toBe("Gone");
        expect(textRow[1]).toBe("Gowings");
        expect(textRow[2]).toBe("Poo to");

        const csvRow = ColumnTextHelper.getRowCSV(item, columns);

        expect(csvRow).toBe("Gone,Gowings,Poo to");

        const items = [
            item,
            {
                firstName: "Sunburn",
                lastName: "Slapper",
                poo: "yes"
            },
            {
                firstName: "Release",
                lastName: "Manager",
                poo: "yep"
            }
        ];

        const csv = ColumnTextHelper.getCSV(items, columns);

        expect(csv).toBe("First Name,Last Name,Poo\r\nGone,Gowings,Poo to\r\nSunburn,Slapper,Poo yes\r\nRelease,Manager,Poo yep\r\n");
    });
    
});
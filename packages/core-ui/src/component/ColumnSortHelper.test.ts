import * as ColumnSortHelper from "./ColumnSortHelper";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

describe("Column Sort Helper", () => {
    test("applySort()", () => {
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
            }
        ];
        let sorted = ColumnSortHelper.applySort(columns, { field: "firstName", descending: false });
        expect(sorted[0].isSorted).toBeTruthy();
        expect(sorted[0].isSortedDescending).toBeTruthy(); // Reversed, since fabric's definition of 'descending' is 'arrow pointed down' !!!
        expect(sorted[1].isSorted).toBeFalsy();
        expect(sorted[1].isSortedDescending).toBeFalsy();

        sorted = ColumnSortHelper.applySort(columns, { field: "firstName", descending: true });
        expect(sorted[0].isSorted).toBeTruthy();
        expect(sorted[0].isSortedDescending).toBeFalsy(); // Reversed, since fabric's definition of 'descending' is 'arrow pointed down' !!!
        expect(sorted[1].isSorted).toBeFalsy();
        expect(sorted[1].isSortedDescending).toBeFalsy();

        sorted = ColumnSortHelper.applySort(columns, { field: "lastName", descending: false });
        expect(sorted[0].isSorted).toBeFalsy();
        expect(sorted[0].isSortedDescending).toBeFalsy();
        expect(sorted[1].isSorted).toBeTruthy();
        expect(sorted[1].isSortedDescending).toBeTruthy(); // Reversed, since fabric's definition of 'descending' is 'arrow pointed down' !!!

        sorted = ColumnSortHelper.applySort(columns, { field: "lastName", descending: true });
        expect(sorted[0].isSorted).toBeFalsy();
        expect(sorted[0].isSortedDescending).toBeFalsy();
        expect(sorted[1].isSorted).toBeTruthy();
        expect(sorted[1].isSortedDescending).toBeFalsy(); // Reversed, since fabric's definition of 'descending' is 'arrow pointed down' !!!
    });
    test("createFieldItemsFromColumns()", () => {
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
            }
        ];
        const items = ColumnSortHelper.createFieldItemsFromColumns({ columns: columns, selectedField: "firstName" });
        expect(items[0].key).toBe(columns[0].key);
        expect(items[0].name).toBe(columns[0].name);
        expect(items[0].fieldName).toBe(columns[0].fieldName);
        expect(items[0].checked).toBeTruthy();

        expect(items[1].key).toBe(columns[1].key);
        expect(items[1].name).toBe(columns[1].name);
        expect(items[1].fieldName).toBe(columns[1].fieldName);
        expect(items[1].checked).toBeFalsy();
    });
    test("createSortOrderItems()", () => {
        const items = ColumnSortHelper.createSortOrderItems({ sortDescending: false });
        expect(items.length).toBe(2);
        expect(items[0].key).toBe("asc");
        expect(items[0].checked).toBeTruthy();
        expect(items[1].key).toBe("desc");
        expect(items[1].checked).toBeFalsy();
    });
    test("createSortItems()", () => {
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
            }
        ];
        const items = ColumnSortHelper.createSortItems({ columns: columns, sortField: "firstName", sortDescending: false });
        // fields and sort order section
        expect(items.length).toBe(2);
        expect(items[0].sectionProps.items.length).toBe(2);
        expect(items[1].sectionProps.items.length).toBe(2);
    });
});
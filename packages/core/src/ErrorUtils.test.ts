import { getKeyErrors, getKeyErrorMessage } from "./ErrorUtils";
import { IError } from "./IError";

describe("Error Utils Test", () => {
    test("all", () => {
        const errors : IError[] = [
            {
                code: "REQUIRED",
                key: "firstName",
                message: "First Name is required"
            },
            {
                code: "INVALID",
                key: "firstName",
                message: "First Name is invalid"
            },
            {
                code: "REQUIRED",
                key: "lastName",
                message: "Last Name is required"
            }
        ];

        const firstNameErrors = getKeyErrors("firstName", errors);
        expect(firstNameErrors.length).toBe(2);

        const lastNameErrors = getKeyErrors("lastName", errors);
        expect(lastNameErrors.length).toBe(1);

        const firstNameErrorMessage = getKeyErrorMessage("firstName", errors);
        expect(firstNameErrorMessage.indexOf("First Name is required")).toBeGreaterThanOrEqual(0);
        expect(firstNameErrorMessage.indexOf("First Name is invalid")).toBeGreaterThanOrEqual(0);

        expect(getKeyErrorMessage("lastName", errors)).toBe("Last Name is required");
    });
});
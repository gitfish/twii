import { getStyles } from "common/component/Error.styles";
import { getClassNames } from "common/component/Error.classNames";

describe("Error Style", () => {
    test("Default Class Names", () => {
        const styles = getStyles(undefined);
        const classNames = getClassNames(styles);
        expect(classNames.root).toBeTruthy();
    });
});
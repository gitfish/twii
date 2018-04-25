import { Stack } from "./Stack";
import * as ComponentTypes from "./ComponentTypes";

class Grid extends Stack {
    get type() {
        return ComponentTypes.grid;
    }
}

export { Grid }
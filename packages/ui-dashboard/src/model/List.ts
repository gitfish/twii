import { Stack } from "./Stack";
import * as ComponentTypes from "./ComponentTypes";

class List extends Stack {
    get type() {
        return ComponentTypes.list;
    }
}

export { List as default, List }
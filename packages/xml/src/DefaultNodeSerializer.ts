import INodeSerializer from "./INodeSerializer";
import { XMLSerializer } from "xmldom";

class DefaultNodeSerializer implements INodeSerializer {
    private _serializer = new XMLSerializer();
    serializeNode(node : Node) : string {
        return this._serializer.serializeToString(node);
    }
}

export { DefaultNodeSerializer as default, DefaultNodeSerializer }
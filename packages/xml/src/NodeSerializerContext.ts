import INodeSerializer from "./INodeSerializer";
import DefaultNodeSerializer from "./DefaultNodeSerializer";
import Context from "@twii/core/lib/Context";

const NodeSerializerContext = new Context<INodeSerializer>({
    factory() {
        return new DefaultNodeSerializer();
    }
});

export { NodeSerializerContext as default, NodeSerializerContext }
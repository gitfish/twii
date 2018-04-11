import { Context } from "@pu/common/lib/Context";
import { IImageService } from "./IImageService";
import { RestImageService } from "./RestImageService";

const ImageServiceContext = new Context<IImageService>({
    factory() {
        return new RestImageService();
    }
});

export { ImageServiceContext }
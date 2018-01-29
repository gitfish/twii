import * as React from "react";
import { Router } from "roota/lib/Router";

const ImageRouter = new Router();
ImageRouter.use("/entity/search/banner", req => {
    return import("entity/component/EntitySearchLogo").then(m => {
        return <m.EntitySearchLogo width={req.params.width} height={req.params.height} />;
    });
});
ImageRouter.use("/entity/profile/banner", req => {
    return import("entity/profile/component/EntityProfileBanner").then(m => {
        return <m.EntityProfileBanner width={req.params.width} height={req.params.height} />;
    });
});
ImageRouter.use("/search/banner", req => {
    return import("search/component/SearchBanner").then(m => {
        return <m.SearchBanner width={req.params.width} height={req.params.height} />;
    });
});

export { ImageRouter }
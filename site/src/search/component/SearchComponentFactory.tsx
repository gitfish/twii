import * as React from "react";
import ISearchCoreModel from "../ISearchCoreModel";
import AirCargoSearchCore from "cargo/air/component/AirCargoSearchCore";
import SeaCargoSearchCore from "cargo/sea/component/SeaCargoSearchCore";
import MailSearchCore from "mail/component/MailSearchCore";
import NISSearchCore from "nis/component/NISSearchCore";
import PNRSearchCore from "pnr/component/PNRSearchCore";

const _map = {
    Cargo_IAir_CR_Line: (core : ISearchCoreModel) => {
        return <AirCargoSearchCore core={core} />;
    },
    Cargo_ISea_CR_Line: (core : ISearchCoreModel) => {
        return <SeaCargoSearchCore core={core} />;
    },
    Mail: (core : ISearchCoreModel) => {
        return <MailSearchCore core={core} />;
    },
    NIS: (core : ISearchCoreModel) => {
        return <NISSearchCore core={core} />;
    },
    PNR: (core : ISearchCoreModel) => {
        return <PNRSearchCore core={core} />;
    }
};

const SearchComponentFactory = (core : ISearchCoreModel) : React.ReactNode => {
    const e = _map[core.id];
    if(e) {
        return e(core);
    }
    return <div>Core {core.id} not yet supported for searching</div>
};

export { SearchComponentFactory as default, SearchComponentFactory }
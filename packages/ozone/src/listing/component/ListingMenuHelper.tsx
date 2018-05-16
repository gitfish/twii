import * as React from "react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";
import { UserAdminContext } from "../../user/UserAdminContext";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { Image } from "office-ui-fabric-react/lib/Image";

const onClickPlaceItem = (e : React.MouseEvent<HTMLButtonElement>, item : IContextualMenuItem) => {
    item.host.load({ path: item.path });
};

const createPlaceItem = (host : IAppHost, item: IContextualMenuItem) : IContextualMenuItem => {
    const r = Object.assign({}, item);
    r.host = host;
    r.canCheck = true;
    r.checked = item.hostCheck ? item.hostCheck(host) : host.path === item.path;
    r.active = r.checked;
    r.className = r.active ? "active" : undefined;
    if(!r.onClick) {
        r.onClick = onClickPlaceItem;
    }
    return r;
};

interface IPlaceItemOptions {
    host: IAppHost;
    userProfile: IUserProfile;
}

const createPlaceItems = (opts : IPlaceItemOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [
        createPlaceItem(opts.host, {
            key: "bookmarks",
            name: "Bookmarks",
            path: "/ozone/bookmarks",
            iconProps: {
                iconName: "DoubleBookmark"
            }
        }),
        createPlaceItem(opts.host, {
            key: "store",
            name: "Store",
            path: "/ozone/store",
            iconProps: {
                iconName: "Shop"
            }
        })
    ];
    if(UserAdminContext.value(opts.userProfile)) {
        r.push(
            createPlaceItem(opts.host, {
                key: "allListings",
                name: "All Listings",
                path: "/ozone/listings",
                iconProps: {
                    iconName: "ViewAll"
                }
            })
        );
    }
    return r;
};

interface IPlaceMenuOptions extends IPlaceItemOptions {
    placeItems?: IContextualMenuItem[];
}

const createPlaceMenu = (opts : IPlaceMenuOptions) : IContextualMenuItem => {
    const placeItems = opts.placeItems || createPlaceItems(opts);
    if(opts.host.sync.syncing) {
        return {
            key: "place",
            name: "Loading...",
            onRenderIcon: () => {
                return <Spinner size={SpinnerSize.small} />;
            },
            subMenuProps: {
                items: placeItems
            }
        };
    }
    const checkedItem = placeItems.find(item => item.checked);
    if(checkedItem) {
        return {
            key: "place",
            name: checkedItem.name,
            iconProps: checkedItem.iconProps,
            onRenderIcon: checkedItem.onRenderIcon,
            subMenuProps: {
                items: placeItems
            }
        }
    }
    return {
        key: "place",
        name: opts.host.title,
        subMenuProps: {
            items: placeItems
        }
    };
};

interface IListingPlaceItemOptions {
    key: string;
    path: string;
    host: IAppHost;
    listingSupplier: IListingModelSupplier;
    onRenderTitle?: (listingSupplier : IListingModelSupplier) => string;
}

const defaultRenderTitle = (listingSupplier : IListingModelSupplier) => {
    return listingSupplier.value.title;
};

const createListingPlaceItem = (opts : IListingPlaceItemOptions) => {
    const { host, listingSupplier } = opts;
    const onRenderTitle = opts.onRenderTitle || defaultRenderTitle;
    return createPlaceItem(host,
        {
            key: opts.key,
            name: listingSupplier.sync.syncing ? "Loading..." : onRenderTitle(listingSupplier),
            path: opts.path,
            onRenderIcon: () => {
                if(listingSupplier.sync.syncing) {
                    return <Spinner size={SpinnerSize.small} />
                }
                return listingSupplier.value.small_icon ? <Image src={listingSupplier.value.small_icon.url} /> : null;
            }
        } 
    );
};

export {
    IPlaceItemOptions,
    createPlaceItems,
    createPlaceItem,
    IPlaceMenuOptions,
    createPlaceMenu,
    IListingPlaceItemOptions,
    createListingPlaceItem
}
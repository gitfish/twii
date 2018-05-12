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

const createPlaceItems = (props : IOzoneAppProps) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [
        createPlaceItem(props.host, {
            key: "bookmarks",
            name: "Bookmarks",
            path: "/ozone/bookmarks",
            iconProps: {
                iconName: "DoubleBookmark"
            }
        }),
        createPlaceItem(props.host, {
            key: "store",
            name: "Store",
            path: "/ozone/store",
            iconProps: {
                iconName: "Shop"
            }
        })
    ];
    if(UserAdminContext.value(props.userProfile)) {
        r.push(
            createPlaceItem(props.host, {
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

const createPlaceMenu = (props : IOzoneAppProps, placeItems: IContextualMenuItem[] = createPlaceItems(props)) : IContextualMenuItem => {
    if(props.host.sync.syncing) {
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
        name: props.host.title,
        subMenuProps: {
            items: placeItems
        }
    };
};

interface ICreateListingPlaceItemOptions {
    key: string;
    path: string;
    host: IAppHost;
    listingSupplier: IListingModelSupplier;
    onRenderTitle?: (listingSupplier : IListingModelSupplier) => string;
}

const defaultRenderTitle = (listingSupplier : IListingModelSupplier) => {
    return listingSupplier.value.title;
};

const createListingPlaceItem = (opts : ICreateListingPlaceItemOptions) => {
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
    createPlaceItems,
    createPlaceItem,
    createPlaceMenu,
    ICreateListingPlaceItemOptions,
    createListingPlaceItem
}
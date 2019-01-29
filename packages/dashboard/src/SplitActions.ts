import { action, IAction } from "mobx";
import { IComponent } from "./model/IComponent";
import { HSplit, VSplit } from "./model/Split";

const splitHorizontal = action((replace : IComponent, left : IComponent, right : IComponent) => {
    const split = new HSplit();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setLeft(left);
    split.setRight(right);
});

const splitVertical = action((replace : IComponent, top : IComponent, bottom: IComponent) => {
    const split = new VSplit();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setTop(top);
    split.setBottom(bottom);
});

export {
    splitHorizontal,
    splitVertical
}
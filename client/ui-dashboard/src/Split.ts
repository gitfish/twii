import { observable, action, computed, autorun } from "mobx";
import { Component } from "./Component";
import { IComponent } from "./IComponent";
import { ISplit, IHSplit, IVSplit } from "./ISplit";
import { ComponentFactoryRouter } from "./ComponentFactoryRouter";
import * as ComponentTypes from "./ComponentTypes";

const Defaults = {
    offset: 0.5
};

class Split extends Component implements ISplit {
    @observable private _offset : number = Defaults.offset;
    @observable private _first : IComponent;
    @observable private _second : IComponent;
    @observable private _splitActive : boolean = false;

    constructor() {
        super();
        this.addEventListener("resize", this._onResize);
    }

    private _onResize = () => {
        if(this._first) {
            this._first.emit({ type: "resize" });
        }
        if(this._second) {
            this._second.emit({ type: "resize" });
        }
    }

    @computed
    get splitActive() {
        return this._splitActive;
    }
    set splitActive(value) {
        this.setSplitActive(value);
    }
    
    @action
    setSplitActive(splitActive : boolean) {
        this._splitActive = splitActive;
        const db = this.dashboard;
        if(splitActive) {
            db.setBlockSource(this);
        } else if(db.blockSource === this) {
            db.clearBlockSource();
        }
    }

    @computed
    get first() {
        return this._first;
    }
    set first(value : IComponent) {
        this.setFirst(value);
    }

    @action
    setFirst(first : IComponent) {
        if(first !== this._first) {
            if(first && first.parent !== this) {
                first.removeFromParent();
            }
            this._first = first;
            if(this._first) {
                this._first.parent = this;
            }
        }
    }

    @computed
    get firstConfig() {
        return this._first ? { component: this._first.config } : undefined;
    }
    
    @action
    setFirstConfig(config : any) {
        if(config && config.component) {
            return ComponentFactoryRouter.handleRequest({ path: config.component.type }).then(component => {
                this.setFirst(component);
                return component.setConfig(config.component);
            });
        }
        this.setFirst(undefined);
        return Promise.resolve();
    }

    @computed
    get second() {
        return this._second;
    }

    set second(value : IComponent) {
        this.setSecond(value);
    }

    @computed
    get secondConfig() {
        return this._second ? { component: this._second.config } : undefined;
    }

    @action
    setSecond(second : IComponent) {
        if(second !== this._second) {
            if(second && second.parent !== this) {
                second.removeFromParent();
            }
            this._second = second;
            if(this._second) {
                this._second.parent = this;
            }
        }
    }

    @action
    setSecondConfig(config : any) {
        if(config && config.component) {
            return ComponentFactoryRouter.handleRequest({ path: config.component.type }).then(component => {
                this.setSecond(component);
                return component.setConfig(config.component);
            });
        }
        this.setSecond(undefined);
        return Promise.resolve();
    }

    @computed
    get offset() {
        return this._offset;
    }
    set offset(value : number) {
        this.setOffset(value);
    }

    @action
    setOffset(offset : number) {
        if(!isNaN(offset) && offset !== this._offset && offset >= 0) {
            this._offset = offset;
        }
    }

    @action
    replace(newComp : IComponent, oldComp : IComponent) : void {
        if(oldComp === this._first || oldComp === this._second) {
            if(oldComp === this._first) {
                this.setFirst(newComp);
            } else if(oldComp === this._second) {
                this.setSecond(newComp);
            }
        }
    }
    
    @action
    remove(comp : IComponent) {
        if(comp === this._first || comp === this._second) {
            const replacement = comp === this._first ? this._second : this._first;
            // clear the parent for both left and right
            if(this._first) {
                this._first.parent = undefined;
            }
            if(this._second) {
                this._second.parent = undefined;
            }
            if(this.parent) {
                this.parent.replace(replacement, this);
            }
        }
    }

    protected _visitChildren(callback) {
        if(this._first) {
            this._first.visit(callback);
        }
        if(this._second) {
            this._second.visit(callback);
        }
    }

    protected _findFirstChild(predicate) {
        let r;
        if(this._first) {
            r = this._first.findFirst(predicate);
        }
        if(!r) {
            r = this._second.findFirst(predicate);
        }
        return r;
    }

    protected _findAllChildren(predicate) : IComponent[] {
        let r = [];
        const lr = this._first ? this._first.findAll(predicate) : undefined;
        const rr = this._second ? this._second.findAll(predicate) : undefined;
        if(lr) {
            r = r.concat(lr);
        }
        if(rr) {
            r = r.concat(rr);
        }
        return r;
    }

    @action
    close() {
        if(this.first) {
            this.first.close();
        }
        if(this.second) {
            this.second.close();
        }
    }
}

class HSplit extends Split implements IHSplit {
    @observable private _minItemWidth : number = 30;

    get type() {
        return ComponentTypes.hsplit;
    }

    @computed
    get minItemWidth() {
        return this._minItemWidth;
    }
    set minItemWidth(value) {
        this.setMinItemWidth(value);
    }

    @action
    setMinItemWidth(minItemWidth : number) {
        this._minItemWidth = minItemWidth;
    }

    @computed
    get left() {
        return this.first;
    }
    set left(value : IComponent) {
        this.setLeft(value);
    }

    @action
    setLeft(left : IComponent) {
        this.setFirst(left);
    }

    @computed
    get leftConfig() {
        return this.firstConfig;
    }
    
    @action
    setLeftConfig(config : any) {
        return this.setFirstConfig(config);
    }

    @computed
    get right() {
        return this.second;
    }

    set right(value : IComponent) {
        this.setRight(value);
    }

    @computed
    get rightConfig() {
        return this.secondConfig;
    }

    @action
    setRight(right : IComponent) {
        this.setSecond(right);
    }

    @action
    setRightConfig(config : any) {
        this.setSecondConfig(config);
    }

    @computed
    get config() {
        return {
            type: this.type,
            offset: this.offset,
            left: this.leftConfig,
            right: this.rightConfig
        };
    }

    @action
    setConfig(config : any) {
        return Promise.all([
            this.setLeftConfig(config ? config.left : undefined),
            this.setRightConfig(config ? config.right : undefined)
        ]).then(() => {
            this.setOffset(config ? config.offset : Defaults.offset);
        });
    }

    @computed
    get columnCount() {
        const left = this.left;
        const right = this.right;
        const leftCount = left && left.type === ComponentTypes.hsplit ? (left as IHSplit).columnCount : 1;
        const rightCount = right && right.type === ComponentTypes.hsplit ? (right as IHSplit).columnCount : 1;
        return leftCount + rightCount;
    }
}

class VSplit extends Split implements IVSplit {
    @observable private _minItemHeight : number = 30;

    get type() {
        return ComponentTypes.vsplit;
    }

    @computed
    get minItemHeight() {
        return this._minItemHeight;
    }
    set minItemHeight(value) {
        this.setMinItemHeight(value);
    }

    @action
    setMinItemHeight(minItemHeight : number) {
        this._minItemHeight = minItemHeight;
    }

    @computed
    get top() {
        return this.first;
    }
    set top(value : IComponent) {
        this.setTop(value);
    }

    @action
    setTop(top : IComponent) {
        this.setFirst(top);
    }

    @computed
    get topConfig() {
        return this.firstConfig;
    }
    
    @action
    setTopConfig(config : any) {
        return this.setFirstConfig(config);
    }

    @computed
    get bottom() {
        return this.second;
    }

    set bottom(value : IComponent) {
        this.setBottom(value);
    }

    @computed
    get bottomConfig() {
        return this.secondConfig;
    }

    @action
    setBottom(bottom : IComponent) {
        this.setSecond(bottom);
    }

    @action
    setBottomConfig(config : any) {
        return this.setSecondConfig(config);
    }

    @computed
    get config() {
        return {
            type: this.type,
            offset: this.offset,
            top: this.topConfig,
            bottom: this.bottomConfig
        };
    }

    @action
    setConfig(config : any) {
        return Promise.all([
            this.setTopConfig(config ? config.top : undefined),
            this.setBottomConfig(config ? config.bottom : undefined)
        ]).then(() => {
            this.setOffset(config ? config.offset : Defaults.offset);
        });
    }

    @computed
    get rowCount() {
        const top = this.top;
        const bottom = this.bottom;
        const topCount = top && top.type === ComponentTypes.vsplit ? (top as IVSplit).rowCount : 1;
        const bottomCount = bottom && bottom.type === ComponentTypes.vsplit ? (bottom as IVSplit).rowCount : 1;
        return topCount + bottomCount;
    }
}

export { Split, HSplit, VSplit }
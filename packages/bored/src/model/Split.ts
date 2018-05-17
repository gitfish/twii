import { observable, action, computed, autorun, IReactionDisposer } from "mobx";
import { Component } from "./Component";
import { IComponent } from "./IComponent";
import { ISplit, IHSplit, IVSplit } from "./ISplit";
import { ComponentFactory } from "./ComponentFactory";
import * as ComponentTypes from "./ComponentTypes";

const Defaults = {
    offset: 0.5
};

class Split extends Component implements ISplit {
    @observable private _offset : number = Defaults.offset;
    @observable private _first : IComponent;
    @observable private _second : IComponent;
    @observable private _splitActive : boolean = false;

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
            return ComponentFactory(config.component.type).then(component => {
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
            return ComponentFactory(config.component.type).then(component => {
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
    @observable private _splitterWidth : number = 5;
    private _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
        this._setViewportDisposer = autorun(this._setPaneViewports);
    }

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
    get maxItemWidth() {
        return this.width - this.minItemWidth - this.splitterWidth;
    }

    @computed
    get splitterWidth() {
        return this._splitterWidth;
    }
    set splitterWidth(value) {
        this.setSplitterWidth(value);
    }
    @action
    setSplitterWidth(splitterWidth : number) {
        if(splitterWidth > 0) {
            this._splitterWidth = splitterWidth;
        }
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
    get leftWidth() {
        return Math.floor(this.offset * this.width);
    }
    set leftWidth(value) {
        this.setLeftWidth(value);
    }
    @action
    setLeftWidth(leftWidth : number) {
        if(leftWidth >= this.minItemWidth && leftWidth <= this.maxItemWidth) {
            this.setOffset(leftWidth / this.width);
        }
    }

    @computed
    get leftConfig() {
        return this.firstConfig;
    }
    set leftConfig(value) {
        this.setLeftConfig(value);
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
    @action
    setRight(right : IComponent) {
        this.setSecond(right);
    }

    @computed
    get rightWidth() {
        return this.width - this.leftWidth - this.splitterWidth;
    }
    set rightWidth(value) {
        this.setRightWidth(value);
    }
    @action
    setRightWidth(rightWidth : number) {
        if(rightWidth >= this.minItemWidth && rightWidth <= this.maxItemWidth) {
            this.setLeftWidth(this.width - rightWidth - this.splitterWidth);
        }
    }

    @computed
    get rightConfig() {
        return this.secondConfig;
    }
    set rightConfig(value) {
        this.setRightConfig(value);
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

    private _setPaneViewports = () => {
        if(this.portalManager) {
            if(this.left) {
                this.left.setViewport(this.x, this.y, this.leftWidth, this.height);
            }
            if(this.right) {
                this.right.setViewport(this.x + this.leftWidth + this.splitterWidth, this.y, this.rightWidth, this.height);
            }
        }
    }
}

class VSplit extends Split implements IVSplit {
    @observable private _minItemHeight : number = 30;
    @observable private _splitterHeight : number = 5;

    private _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
        this._setViewportDisposer = autorun(this._setPaneViewports);
    }

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
    get maxItemHeight() {
        return this.height - this.minItemHeight - this.splitterHeight;
    }

    @computed
    get splitterHeight() {
        return this._splitterHeight;
    }
    set splitterHeight(value) {
        this.setSplitterHeight(value);
    }
    @action
    setSplitterHeight(splitterHeight : number) {
        this._splitterHeight = splitterHeight;
    }

    @computed
    get topHeight() {
        return Math.floor(this.height * this.offset);
    }
    set topHeight(value) {
        this.setTopHeight(value);
    }
    @action
    setTopHeight(topHeight : number) {
        if(topHeight >= this.minItemHeight && topHeight <= this.maxItemHeight) {
            this.setOffset(topHeight / this.height);
        }
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
    @action
    setBottom(bottom : IComponent) {
        this.setSecond(bottom);
    }

    @computed
    get bottomConfig() {
        return this.secondConfig;
    }
    set bottomConfig(value) {
        this.setBottomConfig(value);
    }
    @action
    setBottomConfig(config : any) {
        return this.setSecondConfig(config);
    }

    @computed
    get bottomHeight() {
        return this.height - this.topHeight - this.splitterHeight;
    }
    set bottomHeight(value) {
        this.setBottomHeight(value);
    }
    @action
    setBottomHeight(bottomHeight : number) {
        if(bottomHeight >= this.minItemHeight && bottomHeight <= this.maxItemHeight) {
            this.setTopHeight(this.height - bottomHeight - this.splitterHeight);
        }
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

    private _setPaneViewports = () => {
        if(this.portalManager) {
            if(this.top) {
                this.top.setViewport(this.x, this.y, this.width, this.topHeight);
            }
            if(this.bottom) {
                this.bottom.setViewport(this.x, this.y + this.topHeight + this.splitterHeight, this.width, this.bottomHeight);
            }
        }
    }
}

export { Split, HSplit, VSplit }
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Stack_1 = require("./Stack");
var ComponentTypes = require("./ComponentTypes");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(List.prototype, "type", {
        get: function () {
            return ComponentTypes.list;
        },
        enumerable: true,
        configurable: true
    });
    return List;
}(Stack_1.Stack));
exports.default = List;
exports.List = List;
//# sourceMappingURL=List.js.map
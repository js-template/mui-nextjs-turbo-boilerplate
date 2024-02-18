"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
function Button(props) {
    return (0, jsx_runtime_1.jsx)("button", { onClick: function () { return props.onClick(); }, children: props.children });
}
exports.Button = Button;

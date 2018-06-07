function createElement(tagName, attrs, ...children) {
    const elm = document.createElement(tagName);
    if (attrs instanceof Object) {
        for (var attrName in attrs) {
            if (attrs.hasOwnProperty(attrName)) {
                var attrValue = attrs[attrName];
                if (attrValue !== undefined && attrValue !== null) {
                    if (attrName.startsWith("on")) {
                        if (typeof attrValue === "function") {
                            elm.addEventListener(attrName.substr(2), attrValue);
                        }
                    }
                    else if (typeof attrValue === "string") {
                        elm.setAttribute(attrName, attrValue);
                    }
                    else if (typeof attrValue === "number") {
                        elm.setAttribute(attrName, "" + attrValue);
                    }
                    else if (typeof attrValue === "boolean") {
                        elm.setAttribute(attrName, attrValue ? "true" : "false");
                    }
                }
            }
        }
    }
    addChildren(children);
    function addChildren(children) {
        for (const child of children) {
            addChild(child);
        }
    }
    function addChild(child) {
        if (child instanceof HTMLElement) {
            elm.appendChild(child);
            return;
        }
        if (typeof child === 'string') {
            elm.appendChild(document.createTextNode(child));
            return;
        }
        if (child instanceof Object && child.container) {
            addChild(child.container);
        }
        if (Array.isArray(child)) {
            for (const c of child) {
                addChild(c);
            }
        }
    }
    return elm;
}
// call main if dom ready.
document.addEventListener("DOMContentLoaded", main, false);
class Grid {
    constructor(attrs) {
        const container = createElement("table", null);
        for (let r = 0; r < attrs.rows; ++r) {
            let row = createElement("tr", null);
            for (let c = 0; c < attrs.columns; ++c) {
                row.appendChild(createElement("td", null, "[" + r + "," + c + "]"));
            }
            container.appendChild(row);
        }
        this.container = container;
    }
}
function main() {
    document.body.appendChild(createElement("div", { style: "font-size:20px" },
        new Grid({ rows: 20, columns: 32 })));
}

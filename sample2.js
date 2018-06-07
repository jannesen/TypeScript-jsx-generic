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
function main() {
    const fragment = [
        "This is a fragment",
        createElement("br", null),
        createElement("hr", null),
        createElement("button", { onclick: () => { alert("click"); } }, "click here")
    ];
    document.body.appendChild(createElement("div", { style: "font-size:20px" }, fragment));
}

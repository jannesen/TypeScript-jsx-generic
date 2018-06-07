/* @jsx-mode generic */
/* @jsx-intrinsic-factory createElement */
interface HTMLAttributes {
    style?:     string;
    id?:        string;
    onclick?:   (this: HTMLElement, ev: MouseEvent) => void;
}

type intrinsicNames = "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "menuitem" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr";

interface IContainer {
    readonly container:     AddNode;
}

export interface AddArray extends Array<AddNode> {}
type AddNode = HTMLElement|string|IContainer|AddArray;

function createElement(tagName:intrinsicNames, attrs?: HTMLAttributes, ...children:AddNode[]): HTMLElement {
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
                    else
                    if (typeof attrValue === "string") {
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

    function addChildren(children: AddNode[]) {
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

interface IGridAttr {
    rows:       number;
    columns:    number;
}

class Grid implements IContainer {
    public      container:          HTMLElement;

    constructor(attrs: IGridAttr) {
        const container = <table/>

        for (let r = 0 ; r < attrs.rows; ++r) {
            let row = <tr/>;

            for (let c = 0 ; c < attrs.columns; ++c) {
                row.appendChild(<td>
                                    { "[" + r + "," + c + "]"}
                                </td>);
            }
            container.appendChild(row);
        }
        this.container = container;
    }
}

function main() {

    document.body.appendChild(<div style="font-size:20px">
                                    <Grid rows={20} columns={32} />
                              </div>)
}

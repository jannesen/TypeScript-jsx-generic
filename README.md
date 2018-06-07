# TypeScript jsx-generic

JSX is an XML-like syntax extension to ECMAScript without any defined semantics. It's intended to be used by various preprocessors (transpilers) to transform these tokens into standard ECMAScript.

The JSX implementation of TypeScript was original developed for use with React. The relationship between JSX and React is like JavaScript and React.

Since TypeScript 1.6 I have patch TypeScript to use JSX in a generic why with our projects.

## What is jsx-generic
JSX-generic is a way to use JSX in TypeScript without de use of a (heavy) library/framework. And it keeps al the typing!

## How to use jsx-generic
De the following 2 lines in the top of je tsx file

    /* @jsx-mode generic */
    /* @jsx-intrinsic-factory <intrinsic-factory-createElement> */

Use compiler options jsx: 'react'

## JSX elements
There are 4 types of JSX elements: 
* intrinsic
* functions
* class
* fragment


### Intrinsic elements
A intrinsic element is always a identifier and starts with a lowercase letter. Intrinsic elements are constructed using the intrinsic-factory-createElement.
intrinsic-factory-createElement must have the following signature:

    createElement(tagName: string, attrs?: AttributesInterface, …children: ChildrenType[]): ElementType

With jsx-generic there is no need for special JSX namespace. All the typing information is gained from the createElement signature.

For example _&lt;div class=”test”&gt;_ is transpiled to _createElement("div", { class: "test" });_

All typing is checked. the type of &lt;div&gt; the returned type of createElement.
Also function overloads of createElements is supported.


### Function elements.
For example the function MyButton:
```typescript
function MyButton(attrs: { text:string, tooltip?:string}) {
    returns <button class="mybutton" tooltip={attrs.tooltip}>{ attrs.text}</button>;
}
```

Can be used in JSX like 

```typescript
    <div>
       <MyButton text="click here" />
    </div>
```
_&lt;MyButton text="click here" /&gt;_ Is transpiled to _MyButton({text: "click here"})_


### Class elements.
For example the function Grid class:
```typescript
class Grid implements IContainer {
    public      container:          HTMLElement;

    constructor(attrs: { rows:number, columns: number }) {
    }
}
```

Can be used in JSX like 

```typescript
    <div>
       <Grid rows={10} columns{20} />
    </div>
```
_&lt;Grid rows={10} columns{10} /&gt;_ Is transpiled to _new Grid({rows: 10, columns: 20})_


### fragments
Fragments is a collection of jsx elements with out a real root element. jsx generic transpiles fragments to array. For examle:

```typescript
    <>
        <div/>
        <br>
        <div/>
    </>
```

is transpiled to
```javascript
    [ createElement('div'), createElement('br'), createElement('div') ]
```

The type of a fragment is the union of the element types in the fragment.

## Typechecking.
jsx generic use typechecking for everything.The type of attributes en children are checked. The returned type is the correct type.




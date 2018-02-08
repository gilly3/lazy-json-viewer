# lazy-json-viewer

A jQuery plugin for viewing JSON in a web browser.

[![lazy-json-viewer screenshot](http://gilly3.com/ljv/ljv.png?1)](http://gilly3.com/ljv/)

## Demo

[gilly3.com/ljv](http://gilly3.com/ljv/)

## Get it

[npm](https://www.npmjs.com/package/lazy-json-viewer):

```sh
$ npm i -S lazy-json-viewer
```

bower:

```sh
$ bower install lazy-json-viewer -S
```

## Usage

Include jQuery, the stylesheet, and the script file in the page.  Add an element to hold the json viewer.

```html
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<link href="lazyjsonviewer.css" rel="stylesheet" />
<script src="lazyjsonviewer.js"></script>
<div id="json"></div>
```

Call `jsonViewer()` on your jQuery object, passing the data object that you want to visualize.

```javascript
var obj = {
    aString: "Hello world!",
    aNumber: 42,
    aBoolean: true,
    anArray: [5, 6, 7, 8],
    anObject: {
        aSubProperty: "value"
    }
};
$("#json").jsonViewer(obj);
```

## Customize

This package comes with a default stylesheet, but you can override its styles in your own stylesheet, or completely replace it.

### Classes

* `.lazy-json-viewer` - The root element which is appended to your target element has this class.
* `.*-value` - Each element containing a value is given a class name consisting of its type, followed by `-value`. Eg: `.null-value`, `.array-value`, `.object-value`, `.string-value`, `.number-value`, `.boolean-value`.  The html contains only the raw value. Quotes and brackets are added with css:

```css
.lazy-json-viewer .array-value > ::before { content: "["; }
.lazy-json-viewer .array-value > ::after  { content: "]"; }
```

* `.value-summary` - This is a child element of `.object-value` or `.array-value` that contains the value that is displayed while collapsed (either the length of the array, or the number of properties in the object).
* `.content` - This is a child element of `.object-value` or `.array-value` that contains the full expanded value.
* `.property` - This is a child element of `.content` that contains information about a single Object property or Array element.
* `.property-name` - This is a child element of `.property` that contains the property name or array index.  It is followed by a `.*-value` sibling element (see above).
* `.json-expander` - This class is added to `.property-name` elements for expandable properties (non-empty objects and arrays, and multiline strings).  It adds a clickable indicator (via `::before`) to expand and collapse the property value.
* `.expand-all` - This is a child element of `.json-expander` that is present when the property's expanded contains expandable properties.  It displays clickable "expand all" text (via `::before`) that is visible on hover.  Clicking will expand all descendent values, recursively.  To disable expand-all functionality, you may hide this element in your CSS.
* `.collapsed` - This class is added to `.property` elements to hide the `.value-summary` and show the `.content`.
* `.multiline` - This class is added to `.string-value` elements when the value contains a line break.
* `.contains-quote` - This class is added to `.string-value` elements when the value contains a double quote character (and does not contain a backtick character).

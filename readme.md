# lazy-json-viewer

A jQuery plugin for viewing JSON in a web browser.

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
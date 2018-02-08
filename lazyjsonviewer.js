(function () {
    $.fn.jsonViewer = function (obj) {
        createViewer(obj, this);
        return this;
    }

    function createViewer(obj, target) {
        var el = $("<div>").addClass("lazy-json-viewer");
        writeValue(obj, el);
        el.appendTo(target);
    }

    function writeValue(val, target, deep) {
        target.data("val", val);
        var el = $("<div>").appendTo(target);
        switch (typeof val) {
            case "object":
                if (val === null) {
                    el.addClass("null-value").text("null");
                }
                else {
                    var length = Object.keys(val).length;
                    el.addClass(Array.isArray(val) ? "array-value" : "object-value");
                    var labelEl = $("<div>").addClass("value-summary").text(length).appendTo(el);
                    var content = $("<div>").addClass("content").appendTo(el);
                    if (length) {
                        var expander = addExpander(val, el, deep);
                        if (expander && !deep) {
                            expander.one("click", function () {
                                if (content.is(":empty()")) {
                                    writeProperties(val, content);
                                }
                            });
                        }
                        else {
                            writeProperties(val, content, deep);
                        }
                    }
                }
                break;
            case "string":
                if (/\n/.test(val)) {
                    el.addClass("multiline");
                    addExpander(val, el);
                }
                if (/"/.test(val)) {
                    if (/`/.test(val)) {
                        val = val.replace(/"/g, '\\"');
                    }
                    else {
                        el.addClass("contains-quote");
                    }
                }
            default:
                el.addClass((typeof val) + "-value").text(val);
                break;
        }
        return el;
    }

    function writeProperties(val, target, deep) {
        Object.keys(val).forEach(function (key) {
            var propEl = $("<div>").addClass("property").attr("data-property-name", key).attr("data-property-val", val[key]).appendTo(target)
            $("<div>").addClass("property-name").text(key + ":").appendTo(propEl);
            writeValue(val[key], propEl, deep);
        });
    }

    function writePropertiesDeep(i, propertyEl) {
        var property = $(propertyEl);
        var el = $(document.createDocumentFragment());
        writeProperties(property.data("val"), el, true);
        el.find(".collapsed").removeClass("collapsed");
        property.find(".content").append(el.children());
    }

    function addExpander(val, el, deep) {
        var property = el.parent();
        if (!property.is(".lazy-json-viewer")) {
            var expander = property.children(".property-name").addClass("json-expander").click(expanderClick);
            if (hasSubKeys(val)) {
                $("<div>")
                    .addClass("expand-all")
                    .appendTo(expander)
                    .click(expandAllClick)
                    .css("marginLeft", (Object.keys(val).length.toString().length + 4) + "ch");
            }
            if (!deep) {
                property.addClass("collapsed");
            }
            return expander;
        }
    }

    function hasSubKeys(val) {
        return Object.keys(val).some(function (key) {
            return val[key] && (
                (typeof val[key] == "object" && Object.keys(val[key]).length) || // non-empty object or array
                (typeof val[key] == "string" && /\n/.test(val[key])) // string with line breaks
            );
        })
    }

    function expanderClick(e) {
        $(this).closest(".property").toggleClass("collapsed");
        setTimeout(toggleExpandAllLinks, 0); // allow writeProperties to run first
    }

    function expandAllClick(e) {
        e.stopPropagation();
        var property = $(this).closest(".property").removeClass("collapsed");
        // render any unrendered descendents
        property.find(".content:empty()").closest(".property").each(writePropertiesDeep);
        // unhide any rendered but hidden descendents
        while (property.find(".collapsed > .json-expander").click().length);
        toggleExpandAllLinks();
    }

    function toggleExpandAllLinks() {
        $(".lazy-json-viewer .expand-all").hide();
        $(".lazy-json-viewer .content:empty(), .lazy-json-viewer .content:has(.collapsed)").parent().prev().find(".expand-all").show();
    }
})();

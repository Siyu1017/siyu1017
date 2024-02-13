import Module_Htmltransform from '../@htmltransform/htmltransform.js';

function ApplyObject(obj, defaultValue, value) {
    if (obj.nodeName != "text") {
        var element = document.createElement(obj.nodeName);
        Object.keys(obj).forEach((item, i) => {
            var val = Object.values(obj)[i];
            if (item != "nodeName" && item != "text" && item != "children") {
                /*
                if (val.search(/\{\w+?\}/gi) > -1) {
                    val = val.replaceAll(/\{\w+?\}/gi, (match, p1) => {
                        var key = match.replace(/\{|\}/gi, "");
                        if (value[key]) return value[key];
                        if (defaultValue[key]) return defaultValue[key];
                        return match;
                    })
                }
                */
                element.setAttribute(item, val);
            } else if (item == "text") {
                /*
                if (val.search(/\{\w+?\}/gi) > -1) {
                    val = val.replaceAll(/\{\w+?\}/gi, (match, p1) => {
                        var key = match.replace(/\{|\}/gi, "");
                        if (value[key]) return value[key];
                        if (defaultValue[key]) return defaultValue[key];
                        return match;
                    })
                }
                */
                element.innerText = val;
            }
        })
        if (obj.children) {
            obj.children.forEach(child => {
                element.appendChild(ApplyObject(child));
            })
        }
        return element;
    }
}

export default function Templateify(template, value = {}) {
    var defaultValue = template.defaultValue || {};
    var templateValue = template.template;
    var tempateType = template.type;
    templateValue = templateValue.replaceAll(/\{\w+?\}/gi, (match, p1) => {
        var key = match.replace(/\{|\}/gi, "");
        if (value[key]) return value[key];
        if (defaultValue[key]) return defaultValue[key];
        return match;
    })
    if (tempateType == "string") {
        return templateValue;
    } else if (tempateType == "dom") {
        // fix the replace order
        var DOM_Obj = Module_Htmltransform(templateValue).children[0];
        return ApplyObject(DOM_Obj);
    }
}